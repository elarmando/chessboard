import Piece from "./piece.js";
import PIECES from "./pieces.js";
export default class Bishop extends Piece{
    constructor(isWhite)
    {
        super(isWhite)
        this.className = (isWhite) ? PIECES.L_BISHOP : PIECES.D_BISHOP;
    }

    copy()
    {
        var newBishop = new Bishop(this.isWhite);
        this.copyBase(newBishop);

        return newBishop;
    }

    getAttackedSquares() {
        var chessboard = this.chessboard;
        var icol = this.col + 1;
        var irow = this.row + 1;
        var mrow = chessboard.getMaxCol();
        var mcol = chessboard.getMaxRow();
        var limit = false;
        var squares = [];

        while (icol <= mcol && irow <= mrow && limit == false) {
            limit = this.addSquare(irow, icol, chessboard, squares);

            irow++;
            icol++;
        }

        limit = false;
        icol = this.col - 1;
        irow = this.row + 1;

        while (icol >= 0 && irow <= mrow && limit == false) {
            limit = this.addSquare(irow, icol, chessboard, squares);
            icol--;
            irow++;
        }

        limit = false;
        icol = this.col - 1;
        irow = this.row - 1;

        while (icol >= 0 && irow >= 0 && limit == false) {
            limit = this.addSquare(irow, icol, chessboard, squares);
            icol--;
            irow--;
        }

        limit = false;
        icol = this.col + 1;
        irow = this.row - 1;

        while (icol <= mcol && irow >= 0 && limit == false) {
            limit = this.addSquare(irow, icol, chessboard, squares);

            icol++;
            irow--;
        }

        return squares;
    }

    getPossibleMoves() {
        return this.getAttackedSquares();
    }

    getAttackedSquaresLine(targetCol, targetRow) {
        //This function returns all the squares attacked that are aligned with the target square (they are in the same bishop diagonal) 
        var line = [];
        var moves = this.getPossibleMoves();

        for (var i = 0; i < moves.length; i++) {
            var difrows = Math.abs(moves[i].row - targetRow);
            var difcols = Math.abs(moves[i].col - targetCol);

            if (difrows == difcols)//if number of cols and rows are the same, it means they are in the same diagonal
                line.push(moves[i]);
        }

        return line;
    }

    addSquare(row, col, chessboard, squares) {
        var limit = false;

        var square = chessboard.getSquare(row, col);

        if (square.piece) {
            limit = true;

            if (square.piece.isWhite != this.isWhite)
                squares.push(square);
        }
        else {
            squares.push(square);
        }

        return limit;
    }
}
