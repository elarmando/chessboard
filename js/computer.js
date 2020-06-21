function Computer(chessboard)
{
    var self = this;
    this.isWhite = false;
    this.chessboard = chessboard;

    this.move = function()
    {
        if(!self._isMyTurn())
            return;

        var moves = self._getMoves();

        if(moves.length == 0)
            return;

        var index = Math.floor(Math.random() * moves.length);
        var move = moves[index];

        chessboard.move(move.SquareFrom, move.SquareTo);
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


function PieceMove(squareFrom, squareTo)
{
    this.SquareFrom = squareFrom;
    this.SquareTo = squareTo;
}