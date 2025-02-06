import Piece from "./piece";
import PIECES from "./pieces";
import DataSquare from "./dataSquare";

export default class Bishop extends Piece{
    constructor(isWhite: boolean)
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
        var protectedSquares = this.getProtectedSquares();
        var squares = this.removeSquaresWithSameColorPieces(protectedSquares);

        return squares;
    }

    getProtectedSquares(): DataSquare[] {
        var chessboard = this.chessboard;
        var icol = this.col + 1;
        var irow = this.row + 1;
        var mrow = chessboard.getMaxCol();
        var mcol = chessboard.getMaxRow();
        var limit = false;
        var squares: DataSquare[] = [];

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

    getAttackedSquaresLine(targetCol: number, targetRow: number) {
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

    addSquare(row: number, col: number, chessboard: any, squares: DataSquare[]) {
        var limit = false;

        var square = chessboard.getSquare(row, col);

        if (square.piece) {
            limit = true;

            //if (square.piece.isWhite != this.isWhite)
                squares.push(square);
        }
        else {
            squares.push(square);
        }

        return limit;
    }

    //should return true if the square is attacked by the piece, even if there are other pieces in the middle
    isSquareOnXRay(row: number, col: number){
        let diffy = Math.abs(this.row - row);
        let diffx = Math.abs(this.col - col);
        let isBishopSquare = diffy === diffx;
        return isBishopSquare;
    }
}
