function Piece(iswhite) {
    this.className;
    this.isWhite = iswhite;
    this.chessboard = null;
    this.wasMoved = false;
    this.row = undefined;
    this.col = undefined;

    this.isValidMove = function (origRow, origCol, destRow, destCol) {
        return true;
    }

    this.getAttackedSquares = function (chessboard) {

        return [];
    }

    this.getPossibleMoves = function (chessboard) {
        return [];
    }
}

function PieceFactory() {
    this.createDarkBishop = function () {
        return new Bishop(false);
    }

    this.createLightBishop = function () {
        return new Bishop(true);
    }

    this.createDarkRook = function () {
        return new Rook(false);
    }

    this.createLightRook = function () {
        return new Rook(true);
    }

    this.createDarkKight = function () {
        return new Knight(false);
    }

    this.createLightKight = function () {
        return new Knight(true);
    }

    this.createDarkQueen = function () {
        return new Queen(false);
    }

    this.createLightQueen = function () {
        return new Queen(true);
    }

    this.createDarkKing = function () {
        return new King(false);
    }

    this.createLightKing = function () {
        return new King(true);
    }

    this.createDarkPawn = function () {
        return new Pawn(false);
    }

    this.createLightPawn = function () {
        return new Pawn(true);
    }
}

var PIECES =
{
    D_BISHOP: "piece-darkbishop",
    L_BISHOP: "piece-lightbishop",

    D_QUEEN: "piece-darkqueen",
    L_QUEEN: "piece-lightqueen",

    D_KNIGHT: "piece-darkknight",
    L_KNIGHT: "piece-lightknight",

    D_KING: "piece-darkking",
    L_KING: "piece-lightking",

    D_PAWN: "piece-darkpawn",
    L_PAWN: "piece-lightpawn",

    D_ROOK: "piece-darkrook",
    L_ROOK: "piece-lightrook"
}
