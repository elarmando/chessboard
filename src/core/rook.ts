
import DataSquare from "./dataSquare";
import Piece from "./piece";
import PIECES from "./pieces";

export default class Rook extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.className = (isWhite) ? PIECES.L_ROOK : PIECES.D_ROOK;
    }

    copy()
    {
        var newPiece = new Rook(this.isWhite);
        this.copyBase(newPiece);

        return newPiece;
    }

    getAttackedSquares() :DataSquare[]{
        var protectedSquares = this.getProtectedSquares();
        var squares = this.removeSquaresWithSameColorPieces(protectedSquares);

        return squares;
       /* var filterSquaresWithPiecesSameColor = [];

        for(let i = 0; i < protectedSquares.length; i++){
            let square = protectedSquares[i];

            if(square.piece){
                if(square.piece.isWhite != this.isWhite){
                    filterSquaresWithPiecesSameColor.push(square);
                }
            }
            else{
                filterSquaresWithPiecesSameColor.push(square);
            }
        }
        
        return filterSquaresWithPiecesSameColor;*/
    }

    getProtectedSquares() {
        var squares: DataSquare[] = [];
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

    getPossibleMoves(): DataSquare[] {
        return this.getAttackedSquares();
    }

    getAttackedSquaresLine(targetCol: number, targetRow: number) {
        var squares = [];
        var moves = this.getPossibleMoves();

        for (var i = 0; i < moves.length; i++) {
            if (moves[i].col == targetCol || moves[i].row == targetRow)
                squares.push(moves[i]);
        }

        return squares;
    }

    addSquare(row: number, col: number, squares: DataSquare[]) {
        var chessboard = this.chessboard;
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
      if(this.col == col || this.row == row)
        return true;
      return false;
    }


}
