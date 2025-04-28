import DataSquare from "./dataSquare";
import PieceMove from "./pieceMove";

export default class Computer
{
    isWhite: boolean = false;
    chessboard:any;

    constructor(chessboard:any){
        this.chessboard = chessboard;
    }

    public move()
    {
        if(!this._isMyTurn())
            return;

        var moves = this._getValidMoves();

        if(moves.length == 0)
            return;

        var index = Math.floor(Math.random() * moves.length);
        //var index = moves.length - 1;
        var move = moves[index];

        this.chessboard.move(move.squareFrom, move.squareTo);
    }

    /*public findCheckMate()
    {
        var finder = new CheckMate();
        var moves = finder.find(this.chessboard);
        return moves;
    }*/

    private _getValidMoves()
    {
        var moves = this._getMoves() as PieceMove[];
        var validMoves: PieceMove[] = [];

        moves.forEach(e => {
            if(this.chessboard.isValidMove(e.squareFrom, e.squareTo))
                validMoves.push(e);
        });

        return validMoves;
    }

    private _getMoves()
    {
        var pieces = this.chessboard.getPieces(this.isWhite);
        var listOfMoves = [];

        for(var i = 0; i < pieces.length; i++)
        {
            var piece = pieces[i];
            var moves = piece.getPossibleMoves();

            for(var j = 0; j < moves.length; j++)
            {
                var squareFrom = new DataSquare(piece.col, piece.row);
                var squareTo = moves[j];
                listOfMoves.push(new PieceMove(squareFrom, squareTo));
            }
        }

        return listOfMoves;
    }

    private _isMyTurn()
    {
        return this.isWhite == this.chessboard.isWhiteTurn;
    }
}


/* class CheckMate
{
    find(chessboard)
    {
        var moves = [];
        moves = this._find(chessboard, moves);
        return moves;
    }

    _find(chessboard, moves)
    {
        if(chessboard.isCheckMate())
            return moves;
        
        var solutionMoves = null;

        for(var i = 0; i < moves.length; i++)
        {
            var move = moves[i];
            var newMoves = [...moves, move];
            var boardCopy = chessboard.copy();

            boardCopy.move(move.squareFrom, move.squareTo);
            newMoves = this._find(boardCopy, newMoves);

            if(newMoves != null)//its checkmate using the new move
            {
                if(solutionMoves == null)
                    solutionMoves = newMoves;
                else if(newMoves.length < solutionMoves.length)//keep the solution with less moves
                    solutionMoves = newMoves;
            }

            boardCopy = null;
        }

        return solutionMoves;
    }
} */

export class CheckMate
{
    MAX_DEPTH: number;

    constructor(){
        this.MAX_DEPTH = 10;
    }

    public search(chessboard: any, depth?: number, current_moves?: any[]):any[]
    {
        if(depth === undefined)
            depth = 1;
        
        if(current_moves === undefined)
            current_moves = [];

        if(chessboard.isCheckMate())
            return current_moves;

        if(depth == this.MAX_DEPTH)
            return null;//not found


        var moves = chessboard.getMoves();

        for(var i = 0; i < moves.length; i++)
        {
            var move = moves[i];

            var copy = chessboard.copy();
            copy.move(move.squareFrom, move.squareTo);

            var variation_moves = [...current_moves, move];
            var solution = this.search(copy, depth + 1, variation_moves);

            if(solution != null){
                return solution;
            }
        }

        return null;
    }
} 
/*
function PieceMove(squareFrom, squareTo)
{
    this.squareFrom = squareFrom;
    this.squareTo = squareTo;
}*/

