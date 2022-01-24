
export  default function Piece(iswhite) {
    this.className;
    this.isWhite = iswhite;
    this.chessboard = null;
    this.wasMoved = false;
    this.row = undefined;
    this.col = undefined;

    this.isValidMove = function (origSquare, destSquare) {
        var moves = this.getPossibleMoves();
        var found = false;
        var destRow = destSquare.row;
        var destCol = destSquare.col;
        
        for(var i = 0; i < moves.length && !found; i++)
        {
            var move = moves[i];
            
            if(move.row == destRow && move.col == destCol)
                found = true;
        }

        return found;
    }

    this.isAttackingSquare = function(row, col)
    {
        var squares = this.getAttackedSquares();
        for(var i = 0; i < squares.length; i++)
            if(squares[i].col == col && squares[i].row == row)
                return true;
        return false;
    }

    this.getAttackedSquares = function (chessboard) {

        return [];
    }

    this.getPossibleMoves = function (chessboard) {
        return [];
    }

    this.isPossibleToMoveTo = function(col, row)
    {
        var moves = this.getPossibleMoves();

        for(var i = 0; i < moves.length; i++)
            if(moves[i].col == col && moves[i].row == row)
                return true;

        return false;
    }

    this.getAttackedSquaresLine = function(targetCol, targetRow)
    {
        return [];
    }
}
