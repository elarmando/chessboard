import Pawn from "./pawn.js";
import King from "./king.js";
import Knight from "./knight.js";
import Queen from "./queen.js";
import Rook from "./rook.js";
import Bishop from "./bishop.js";

export default function PieceFactory() {
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
