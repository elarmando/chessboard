import Piece from "./piece";
import PIECES from "./pieces";

export default class Knight extends Piece {
    constructor(isWhite) {
        super(isWhite);
        this.className = (isWhite) ? PIECES.L_KNIGHT : PIECES.D_KNIGHT;
    }

    copy()
    {
        var newPiece = new Knight(this.isWhite);
        this.copyBase(newPiece);

        return newPiece;
    }

    getAttackedSquares() {
        var protectedSquares = this.getProtectedSquares();
        var squares = this.removeSquaresWithSameColorPieces(protectedSquares);

        return squares;
    }

    getProtectedSquares(){
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

        squares.forEach((e) => {
            if (e) {
                if (e.piece)
                {

                    //if (e.piece.isWhite != this.isWhite)
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

    getPossibleMoves() {
        return this.getAttackedSquares();
    }
}