
function Queen(isWhite) {
    var self = this;
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_QUEEN : PIECES.D_QUEEN;


    this.isValidMove = function (squareOrig, squareDest) {
        var origRow = squareOrig.row;
        var origCol = squareOrig.col;
        var destCol = squareDest.col;
        var destRow = squareDest.row;

        if (Math.abs(origRow - destRow) == Math.abs(origCol - destCol))
            return true;

        if (Math.abs(origRow - destRow) > 0 && Math.abs(origCol - destCol) == 0)
            return true;

        if (Math.abs(origCol - destCol) > 0 && Math.abs(origRow - destRow) == 0)
            return true;

        return false;
    }


    this.getAttackedSquares = function () {
        var chessboard = this.chessboard;
        var squares = [];
        var maxRow = chessboard.getMaxRow();
        var maxCol = chessboard.getMaxCol();

        var limit = false;

        for (var rowi = this.row + 1; rowi <= maxRow && limit == false; rowi++) {
            limit = addSquare(rowi, this.col, chessboard, squares);
        }
        
        limit = false;
        
        for(var rowi = this.row - 1; rowi >= 0 && limit == false; rowi--)
        {
            limit = addSquare(rowi, this.col, chessboard, squares);
        }
        
        limit = false;


        for(var coli = this.col + 1; coli <= maxCol && limit == false; coli++ )
        {
            limit = addSquare(this.row, coli, chessboard, squares);
        }
        
        limit = false;

        for(var coli = this.col -1; coli >= 0 && limit == false; coli--)
        {
            limit = addSquare(this.row, coli, chessboard, squares);
        }


        limit = false;

        var coli = this.col - 1, rowi = this.row - 1;

        while(coli >= 0 && rowi >= 0 && limit == false)
        {
            limit = addSquare(rowi, coli, chessboard, squares);
            coli--;
            rowi--;
        }

        limit = false;
        coli = this.col + 1, rowi = this.row -1;

        while(coli <= maxCol && rowi >= 0 && limit == false)
        {
        
            limit = addSquare(rowi, coli, chessboard, squares);
            coli++;
            rowi--;
        }

        limit = false;

        coli = this.col + 1;
        rowi = this.row + 1;

        while(coli <= maxCol && rowi <= maxRow && limit == false)
        {
            limit = addSquare(rowi, coli, chessboard, squares);
            coli++;
            rowi++;
        }

        limit = false;

        coli = this.col -1;
        rowi = this.row + 1;

        while(coli >= 0 && rowi <= maxRow && limit == false)
        {
            limit = addSquare(rowi, coli, chessboard, squares);
            coli--;
            rowi++;
        }



        return squares;
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

    this.getPossibleMoves = function () {
        var attacked = this.getAttackedSquares();
        return attacked;
    }
}
