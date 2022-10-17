import DataSquare from "./dataSquare.js";
export default function Computer(chessboard)
{
    var self = this;
    this.isWhite = false;
    this.chessboard = chessboard;

    this.move = function()
    {
        if(!self._isMyTurn())
            return;

        var moves = self._getValidMoves();

        if(moves.length == 0)
            return;

        var index = Math.floor(Math.random() * moves.length);
        //var index = moves.length - 1;
        var move = moves[index];

        chessboard.move(move.squareFrom, move.squareTo);
    }

    this._getValidMoves = function()
    {
        var moves = this._getMoves();
        var validMoves = [];

        moves.forEach(e => {
            if(chessboard.isValidMove(e.squareFrom, e.squareTo))
                validMoves.push(e);
        });

        return validMoves;
    }

    this._getMoves = function()
    {
        var pieces = chessboard.getPieces(self.isWhite);
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

    this._isMyTurn = function()
    {
        return self.isWhite == chessboard.isWhiteTurn;
    }
}


/* class CheckMate
{
    MAX_DEPTH = 3;

    search(chessboard, depth)
    {
        if(chessboard.isCheckMate())
            return chessboard;

        if(depth == this.MAX_DEPTH)
            return null;//not found


        var moves = chessboard.getMoves();

        for(var i = 0; i < moves.length; i++)
        {
            var move = moves[i];
            var copy = chessboard.copy();
            copy.move(move.squareFrom, move.squareTo);

            var solution = this.search(copy, depth + 1 );

            if(solution != null)
                return solution;
        }

        return null;
    }
} */
/*
function PieceMove(squareFrom, squareTo)
{
    this.squareFrom = squareFrom;
    this.squareTo = squareTo;
}*/