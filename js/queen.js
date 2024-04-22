import King from "./king.js";
import Piece from "./piece.js";
import PIECES from "./pieces.js";

export default class Queen extends Piece {
    constructor(isWhite) {
        super(isWhite);
        this.className = (isWhite) ? PIECES.L_QUEEN : PIECES.D_QUEEN;
    }

    copy()
    {
        var newPiece = new Queen(this.isWhite);
        this.copyBase(newPiece);

        return newPiece;
    }

    getProtectedSquares(){
        var chessboard = this.chessboard;
        var squares = [];
        var maxRow = chessboard.getMaxRow();
        var maxCol = chessboard.getMaxCol();

        var limit = false;

        for (var rowi = this.row + 1; rowi <= maxRow && limit == false; rowi++) {
            limit = this.addSquare(rowi, this.col, chessboard, squares);
        }

        limit = false;

        for (var rowi = this.row - 1; rowi >= 0 && limit == false; rowi--) {
            limit = this.addSquare(rowi, this.col, chessboard, squares);
        }

        limit = false;


        for (var coli = this.col + 1; coli <= maxCol && limit == false; coli++) {
            limit = this.addSquare(this.row, coli, chessboard, squares);
        }

        limit = false;

        for (var coli = this.col - 1; coli >= 0 && limit == false; coli--) {
            limit = this.addSquare(this.row, coli, chessboard, squares);
        }


        limit = false;

        var coli = this.col - 1, rowi = this.row - 1;

        while (coli >= 0 && rowi >= 0 && limit == false) {
            limit = this.addSquare(rowi, coli, chessboard, squares);
            coli--;
            rowi--;
        }

        limit = false;
        coli = this.col + 1, rowi = this.row - 1;

        while (coli <= maxCol && rowi >= 0 && limit == false) {

            limit = this.addSquare(rowi, coli, chessboard, squares);
            coli++;
            rowi--;
        }

        limit = false;

        coli = this.col + 1;
        rowi = this.row + 1;

        while (coli <= maxCol && rowi <= maxRow && limit == false) {
            limit = this.addSquare(rowi, coli, chessboard, squares);
            coli++;
            rowi++;
        }

        limit = false;

        coli = this.col - 1;
        rowi = this.row + 1;

        while (coli >= 0 && rowi <= maxRow && limit == false) {
            limit = this.addSquare(rowi, coli, chessboard, squares);
            coli--;
            rowi++;
        }

        return squares;
    }

    getAttackedSquares() {
        var protectedSquares = this.getProtectedSquares();
        return this.removeSquaresWithSameColorPieces(protectedSquares);
    }


    addSquare(row, col, chessboard, squares) {
        var limit = false;

        var square = chessboard.getSquare(row, col);

        if (square.piece) {
            limit = true;

            //if (square.piece.isWhite != this.isWhite){
            //there is a piece of the other color, queen can capture, except the king
            // let isNotKing =!(square.piece instanceof King)

            // if(isNotKing)
            squares.push(square);
            //}
        }
        else {
            squares.push(square);
        }

        return limit;
    }

    getAttackedSquaresLine(targetCol, targetRow) {
        var moves = this.getPossibleMoves();
        var line = []
        for (var i = 0; i < moves.length; i++) {
            var difrows = Math.abs(moves[i].row - targetRow);
            var difcols = Math.abs(moves[i].col - targetCol);

            var samediagonal = difrows == difcols;
            var samecolOrRow = moves[i].col == targetCol || moves[i].row == targetRow;

            if (samediagonal || samecolOrRow)
                line.push(moves[i]);
        }
        return line;
    }

    getPossibleMoves() {
        var attacked = this.getAttackedSquares();
        var posibleSquares = [];

        for (var i = 0; i < attacked.length; i++) {//filter if the attacked square is the other king
            var square = attacked[i];
            var isOtherKing = square.piece && square.piece.isWhite != this.isWhite && square.piece instanceof King;

            if (!isOtherKing)
                posibleSquares.push(square);
        }

        return posibleSquares;
    }


}
