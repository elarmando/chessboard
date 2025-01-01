import DataSquare from "./dataSquare";
import Pawn from "./pawn";

export default class Utils{
    chessboard:any;

    constructor(chessboard: any){
        this.chessboard = chessboard;
    }

    public getMoveAsString(from: DataSquare, to:DataSquare):string{
        var fromSquare = this.chessboard.getSquare(from.row, from.col);

        if(fromSquare.piece instanceof Pawn)
        {
            var toSquare = this.chessboard.getSquare(to.row, to.col);

            if(toSquare.piece === null){
                var b = this.chessboard.convertPositionToString(to.col, to.row);
                return b;
            }
        }

        return "";
    }
}