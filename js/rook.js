
function Rook(isWhite) {
    var self = this;
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_ROOK : PIECES.D_ROOK;

    this.isValidMove = function (squareOrig, squareDest) {
        var origRow = squareOrig.row;
        var destRow = squareDest.row;
        var origCol = squareOrig.col;
        var destCol = squareDest.col;

        if (Math.abs(origRow - destRow) > 0 && Math.abs(origCol - destCol) == 0)
            return true;

        if (Math.abs(origCol - destCol) > 0 && Math.abs(origRow - destRow) == 0)
            return true;

        return false;
    }

    this.getAttackedSquares = function () {
        var squares = [];
        var chessboard = this.chessboard;
        var maxc = chessboard.getMaxRow();
        var maxr = chessboard.getMaxCol();
        var limit = false;

        for(var icol = this.col + 1; icol < maxc && limit == false; icol++ )
        {
            limit = addSquare(this.row, icol, chessboard, squares);            
        }
        
        limit = false;

        for(var icol = this.col - 1; icol >= 0 &&  limit == false; icol--)
        {
            limit = addSquare(this.row, icol, chessboard, squares);
        }
        
        limit = false;

        for(var irow = this.row + 1; irow < maxr && limit == false; irow++)
        {
            limit = addSquare(irow, this.col, chessboard, squares);
        }
        
        limit = false;

        for(var irow = this.row - 1; irow >= 0 && limit == false; irow--)
        {
            limit = addSquare(irow, this.col, chessboard, squares);
        }

        return squares;
    }

    this.getPossibleMoves = function () {
        return this.getAttackedSquares();
    }

    var addSquare = function (row, col, squares) {
        var chessboard =  this.chessboard;
        var limit = false;

        var square = chessboard.getSquare(row, col);

        if (square.piece) {
            limit = true;

            if (square.piece.isWhite != self.isWhite)
                squares.push(square);
        }
        else {
            squares.push(square);
        }

        return limit; 
    }
}
