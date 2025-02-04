import Bishop from "./bishop";
import DataSquare from "./dataSquare";
import Knight from "./knight";
import Pawn from "./pawn";
import Piece from "./piece";
import Rook from "./rook";
import Queen from "./queen";
import King from "./king";
import Square from "./square";

export default class Utils{
    chessboard:any;

    constructor(chessboard: any){
        this.chessboard = chessboard;
    }

    public getMoveAsString(from: DataSquare | string, to:DataSquare | string):string{
        let fromSquareData = this.convertToDataSquare(from);
        let toSquareData = this.convertToDataSquare(to);

        return this.getMoveAsString_(fromSquareData, toSquareData);
    }

     private convertToDataSquare(square: string | DataSquare): DataSquare {
        if (typeof square === "string")
            return this.chessboard.getSquare(square);
        else
            return square as DataSquare
    }

    private getMoveAsString_(from: DataSquare, to: DataSquare): string {
        var fromSquare = this.chessboard.getSquare(from.row, from.col);
        var toSquare = this.chessboard.getSquare(to.row, to.col);

        if (fromSquare.piece instanceof Pawn) {
            if (toSquare.piece === null) { //case when pawn moves to empty square
                var b = this.chessboard.convertPositionToString(to.col, to.row);
                return b;
            } else {
                var pos1 = this.convertPositionToString(from.col, from.row);
                var pos2 = this.convertPositionToString(to.col, to.row);

                return pos1[0] + "x" + pos2;
            }
        }
        else if (fromSquare.piece != null) {
            let letter = this.getPieceLetter(fromSquare.piece);
            let pos2 = this.convertPositionToString(to.col, to.row);

            if (toSquare.piece === null) {
                return letter + pos2;
            } else {
                return letter + "x" + pos2;
            }
        }

        return "";
    }

    private getPieceLetter(piece: Piece): string {
        if (piece instanceof Knight) {
            return "N";
        }
        else if (piece instanceof Bishop) {
            return "B";
        }
        else if (piece instanceof Rook) {
            return "R";
        }
        else if (piece instanceof Queen) {
            return "Q";
        }
        else if (piece instanceof King) {
            return "K";
        }

        return "";
    }

    private convertPositionToString(col: number, row: number): string {
        return this.chessboard.convertPositionToString(col, row);
    }
}