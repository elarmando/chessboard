import DataSquare from "./dataSquare.js"

export default class Piece {
    constructor(isWhite) {
        this.className;
        this.isWhite = isWhite;
        this.chessboard = null;
        this.wasMoved = false;
        this.row = undefined;
        this.col = undefined;
    }

    copyBase(piece) {
        piece.className = this.className;
        piece.isWhite = this.isWhite;
        piece.chessboard = this.chessboard;
        piece.wasMoved = this.wasMoved;
        piece.row = this.row;
        piece.col = this.col;
    }

    isValidMove(origSquare, destSquare) {
        var moves = this.getPossibleMoves();
        var found = false;
        var destRow = destSquare.row;
        var destCol = destSquare.col;

        for (var i = 0; i < moves.length && !found; i++) {
            var move = moves[i];

            if (move.row == destRow && move.col == destCol)
                found = true;
        }

        return found;
    }

    isAttackingSquare(row, col) {
        var squares = this.getAttackedSquares();
        for (var i = 0; i < squares.length; i++)
            if (squares[i].col == col && squares[i].row == row)
                return true;
        return false;
    }

    getAttackedSquares(chessboard) {

        return [];
    }

    getPossibleMoves(chessboard) {
        return [];
    }

    isPossibleToMoveTo(col, row) {
        var moves = this.getPossibleMoves();

        for (var i = 0; i < moves.length; i++)
            if (moves[i].col == col && moves[i].row == row)
                return true;

        return false;
    }

    getAttackedSquaresLine(targetCol, targetRow) {
        return [];
    }

    removeSquaresWithSameColorPieces(squares){
        var filterSquaresWithPiecesSameColor = [];

        for(let i = 0; i < squares.length; i++){
            let square = squares[i];

            if(square.piece){
                if(square.piece.isWhite != this.isWhite){
                    filterSquaresWithPiecesSameColor.push(square);
                }
            }
            else{
                filterSquaresWithPiecesSameColor.push(square);
            }
        }
        
        return filterSquaresWithPiecesSameColor;
    }

    getProtectedSquares(){
        let dataSquare = new DataSquare();
        dataSquare.col = 3;
        dataSquare.row = 3;
        return [dataSquare];
    }
}
