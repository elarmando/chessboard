import Pawn from "./pawn.js";
import King from "./king.js";
import Knight from "./knight.js";
import Queen from "./queen.js";
import Rook from "./rook.js";
import Bishop from "./bishop.js";

export default class PieceFactory {
    createDarkBishop  () {
        return new Bishop(false);
    }

    createLightBishop  () {
        return new Bishop(true);
    }

    createDarkRook  () {
        return new Rook(false);
    }

    createLightRook  () {
        return new Rook(true);
    }

    createDarkKight  () {
        return new Knight(false);
    }

    createLightKight  () {
        return new Knight(true);
    }

    createDarkQueen  () {
        return new Queen(false);
    }

    createLightQueen  () {
        return new Queen(true);
    }

    createDarkKing  () {
        return new King(false);
    }

    createLightKing  () {
        return new King(true);
    }

    createDarkPawn  () {
        return new Pawn(false);
    }

    createLightPawn  () {
        return new Pawn(true);
    }
}
