import DataSquare from "./dataSquare";

export default class Piece {
    isWhite: boolean;
    className: string;
    chessboard: any;
    wasMoved: boolean;
    row: number;
    col: number;

    constructor(isWhite:boolean) {
        this.className;
        this.isWhite = isWhite;
        this.chessboard = null;
        this.wasMoved = false;
        this.row = undefined;
        this.col = undefined;
    }

    copyBase(piece: Piece) {
        piece.className = this.className;
        piece.isWhite = this.isWhite;
        piece.chessboard = this.chessboard;
        piece.wasMoved = this.wasMoved;
        piece.row = this.row;
        piece.col = this.col;
    }

    isValidMove(origSquare:DataSquare, destSquare:DataSquare) {
        var moves = this.getPossibleMoves();
        var found = false;
        var destRow = destSquare.row;
        var destCol = destSquare.col;

        for (var i = 0; i < moves.length && !found; i++) {
            var move = moves[i];

            if (move.row == destRow && move.col == destCol)
                found = true;
        }

        return found;
    }

    isAttackingSquare(row: number, col: number) {
        var squares = this.getAttackedSquares();
        for (var i = 0; i < squares.length; i++)
            if (squares[i].col == col && squares[i].row == row)
                return true;
        return false;
    }

    getAttackedSquares() :DataSquare[] {
        return [] as DataSquare[];
    }

    getPossibleMoves(): DataSquare[] {
        return [];
    }

    isPossibleToMoveTo(col: number, row: number) {
        var moves = this.getPossibleMoves();

        for (var i = 0; i < moves.length; i++)
            if (moves[i].col == col && moves[i].row == row)
                return true;

        return false;
    }

    getAttackedSquaresLine(targetCol: number, targetRow: number): DataSquare[] {
        return [];
    }

    removeSquaresWithSameColorPieces(squares: DataSquare[]){
        var filterSquaresWithPiecesSameColor = [];

        for(let i = 0; i < squares.length; i++){
            let square = squares[i];

            if(square.piece){
                if(square.piece.isWhite != this.isWhite){
                    filterSquaresWithPiecesSameColor.push(square);
                }
            }
            else{
                filterSquaresWithPiecesSameColor.push(square);
            }
        }
        
        return filterSquaresWithPiecesSameColor;
    }

    getProtectedSquares(): DataSquare[]{
        return [];
    }

    //should return true if the square is attacked by the piece, even if there are other pieces in the middle
    isSquareOnXRay(row: number, col:number){
        return false;
    }

    copy(): Piece {
        return null;
    }
}
