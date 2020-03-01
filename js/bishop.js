
function Bishop(isWhite) {
    var self  = this;
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_BISHOP : PIECES.D_BISHOP;

    this.isValidMove = function (squareOrig, squareDest) {
        var origRow = squareOrig.row;
        var destRow = squareDest.row;
        var origCol = squareOrig.col;
        var destCol = squareDest.col;

        if (Math.abs(origRow - destRow) == Math.abs(origCol - destCol))
            return true;

        return false;
    }


    this.getAttackedSquares = function () {
        var chessboard = this.chessboard;
        var icol = this.col + 1;
        var irow = this.row + 1;
        var mrow = chessboard.getMaxCol();
        var mcol = chessboard.getMaxRow();
        var limit = false;
        var squares = [];
        
        while(icol < mcol && irow < mrow && limit == false)
        {
            limit = addSquare(irow, icol, chessboard, squares);

            irow++;
            icol++;
        }
        
        limit = false;
        icol = this.col - 1;
        irow = this.row + 1;

        while(icol >= 0 && irow < mrow && limit == false)
        {
            limit = addSquare(irow, icol, chessboard, squares);
            icol--;
            irow++;
        }
        
        limit = false;
        icol = this.col - 1;
        irow = this.row - 1;
        
        while(icol >= 0 && irow >= 0 && limit == false)
        {
            limit = addSquare(irow, icol, chessboard, squares);
            icol--;
            irow--;
        }
        
        limit = false;
        icol = this.col + 1;
        irow = this.row -1;

        while(icol < mcol && irow >= 0 && limit == false)
        {
            limit = addSquare(irow, icol, chessboard, squares);

            icol++;
            irow--;
        }
        
        return squares;
    }

    this.getPossibleMoves = function () {
        return this.getAttackedSquares();
    }

    var addSquare = function (row, col, chessboard, squares) {
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
