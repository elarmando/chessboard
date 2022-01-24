

import Piece from "./piece.js";
import PIECES from "./pieces.js";


export default function Knight(isWhite) {
    var self = this;
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_KNIGHT : PIECES.D_KNIGHT;

    this.getAttackedSquares = function () {
        var chessboard = this.chessboard;

        var squares = [];

        squares.push(chessboard.getSquare(this.row + 2, this.col - 1));
        squares.push(chessboard.getSquare(this.row + 2, this.col + 1));
        
        squares.push(chessboard.getSquare(this.row + 1, this.col + 2));
        squares.push(chessboard.getSquare(this.row + 1, this.col - 2));
        
        squares.push(chessboard.getSquare(this.row - 1, this.col + 2));
        squares.push(chessboard.getSquare(this.row - 1, this.col - 2));
        
        squares.push(chessboard.getSquare(this.row - 2, this.col + 1));
        squares.push(chessboard.getSquare(this.row - 2, this.col - 1));

        var filtered = [];

        squares.forEach(function(e){
           if(e)
           {
               if(e.piece)
               {
                    if(e.piece.isWhite != self.isWhite)
                        filtered.push(e);
               }
               else
               {
                    filtered.push(e); 
               }
           }
           
        });
        return filtered;
    }

    this.getPossibleMoves = function () {
        return this.getAttackedSquares();
    }

}