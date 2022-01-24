

import Piece from "./piece.js";
import PIECES from "./pieces.js";
export default function Rook(isWhite) {
    var self = this;
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_ROOK : PIECES.D_ROOK;

    this.getAttackedSquares = function () {
        var squares = [];
        var chessboard = this.chessboard;
        var maxc = chessboard.getMaxRow();
        var maxr = chessboard.getMaxCol();
        var limit = false;

        for(var icol = this.col + 1; icol <= maxc && limit == false; icol++ )
        {
            limit = addSquare(this.row, icol, squares);            
        }
        
        limit = false;

        for(var icol = this.col - 1; icol >= 0 &&  limit == false; icol--)
        {
            limit = addSquare(this.row, icol,  squares);
        }
        
        limit = false;

        for(var irow = this.row + 1; irow <= maxr && limit == false; irow++)
        {
            limit = addSquare(irow, this.col,  squares);
        }
        
        limit = false;

        for(var irow = this.row - 1; irow >= 0 && limit == false; irow--)
        {
            limit = addSquare(irow, this.col,  squares);
        }

        return squares;
    }

    this.getPossibleMoves = function () {
        return this.getAttackedSquares();
    }

    this.getAttackedSquaresLine = function(targetCol, targetRow)
    {
        var squares = [];
        var moves = this.getPossibleMoves();

        for(var i = 0; i < moves.length; i++)
        {
            if(moves[i].col == targetCol || moves[i].row == targetRow)
                squares.push(moves[i]);
        }

        return squares;
    }

    var addSquare = function (row, col, squares) {
        var chessboard =  self.chessboard;
        var limit = false;

        var square = chessboard.getSquare(row, col);

        if (square.piece) {
            limit = true;

            if (square.piece.isWhite != self.isWhite)
                squares.push(square);
        }
        else {
            squares.push(square);
        }

        return limit; 
    }
}
