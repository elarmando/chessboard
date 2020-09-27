
function Queen(isWhite) {
    var self = this;
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_QUEEN : PIECES.D_QUEEN;

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

    this.getAttackedSquaresLine = function(targetCol, targetRow)
    {
        var moves = this.getPossibleMoves();
        var line = []
        for(var i = 0; i < moves.length; i++)
        {
            var difrows = Math.abs(moves[i].row - targetRow);
            var difcols = Math.abs(moves[i].col - targetCol);

            var samediagonal = difrows == difcols;
            var samecolOrRow =  moves[i].col == targetCol || moves[i].row == targetRow;

            if(samediagonal || samecolOrRow)
                line.push(moves[i]);
        }
        return line;
    }

    this.getPossibleMoves = function () {
        var attacked = this.getAttackedSquares();
        return attacked;
    }
}
