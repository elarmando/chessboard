
import Piece from "./piece.js";
import PIECES from "./pieces.js";

export default class Rook extends Piece {
    constructor(isWhite) {
        super(isWhite);
        this.className = (isWhite) ? PIECES.L_ROOK : PIECES.D_ROOK;
    }

    copy()
    {
        var newPiece = new Rook(this.isWhite);
        this.copyBase(newPiece);

        return newPiece;
    }

    getAttackedSquares() {
        var squares = [];
        var chessboard = this.chessboard;
        var maxc = chessboard.getMaxRow();
        var maxr = chessboard.getMaxCol();
        var limit = false;

        for (var icol = this.col + 1; icol <= maxc && limit == false; icol++) {
            limit = this.addSquare(this.row, icol, squares);
        }

        limit = false;

        for (var icol = this.col - 1; icol >= 0 && limit == false; icol--) {
            limit = this.addSquare(this.row, icol, squares);
        }

        limit = false;

        for (var irow = this.row + 1; irow <= maxr && limit == false; irow++) {
            limit = this.addSquare(irow, this.col, squares);
        }

        limit = false;

        for (var irow = this.row - 1; irow >= 0 && limit == false; irow--) {
            limit = this.addSquare(irow, this.col, squares);
        }

        return squares;
    }

    getPossibleMoves() {
        return this.getAttackedSquares();
    }

    getAttackedSquaresLine(targetCol, targetRow) {
        var squares = [];
        var moves = this.getPossibleMoves();

        for (var i = 0; i < moves.length; i++) {
            if (moves[i].col == targetCol || moves[i].row == targetRow)
                squares.push(moves[i]);
        }

        return squares;
    }

    addSquare(row, col, squares) {
        var chessboard = this.chessboard;
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
