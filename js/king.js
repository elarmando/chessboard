function King(isWhite) {
    var self = this;
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_KING : PIECES.D_KING;

    this.getAttackedSquares = function () {
        var chessboard = this.chessboard;
        var attacked = [];

        attacked.push(chessboard.getSquare(this.row, this.col + 1));
        attacked.push(chessboard.getSquare(this.row, this.col - 1));

        attacked.push(chessboard.getSquare(this.row + 1, this.col));
        attacked.push(chessboard.getSquare(this.row + 1, this.col + 1));
        attacked.push(chessboard.getSquare(this.row + 1, this.col - 1));

        attacked.push(chessboard.getSquare(this.row - 1, this.col));
        attacked.push(chessboard.getSquare(this.row - 1, this.col + 1));
        attacked.push(chessboard.getSquare(this.row - 1, this.col - 1));

        var filtered = [];

        attacked.forEach(e => {
            if (e != null && e != undefined)
                filtered.push(e);
        });

        return filtered;
    }

    this.getPossibleMoves = function () {
        var chessboard = this.chessboard;
        var attacked = this.getAttackedSquares();
        var filtered = [];
        var attackedByEnemy = chessboard.getSquaresAttackedBy(!this.isWhite);

        attacked.forEach(function (e) {

            var sameColorPiece = (e.piece && e.piece.isWhite == self.isWhite);

            if (e != null && !sameColorPiece) {
                var isSquareAttacked = false;

                for (var i = 0; i < attackedByEnemy.length && isSquareAttacked == false; i++) {
                    var squaredAttacked = attackedByEnemy[i];

                    if (e.isEqual(squaredAttacked))
                        isSquareAttacked = true;
                }

                if (!isSquareAttacked)
                    filtered.push(e);
            }
        });

        //add clastle
        if(this.canShortCastle())
            filtered.push(this.chessboard.getSquare(this.row, this.col + 2));

        if(this.canLongCastle())
            filtered.push(this.chessboard.getSquare(this.row, this.col - 2));

        return filtered;
    }

    this.canShortCastle = function()
    {
         // () Neither the king nor the chosen rook has previously moved.
        // () There are no pieces between the king and the chosen rook.
        // () The king is not currently in check.
        // () The king does not pass through a square that is attacked by an enemy piece.
        // () The king does not end up in check. (True of any legal move.)
        if(this._wereKingOrRookMoved())
            return false;

        if(!this._isShortCastlePathFree())
            return false;

        var squaresKingGoesThrough = [];
        squaresKingGoesThrough.push(this.chessboard.getSquare(this.row, this.col + 1));
        squaresKingGoesThrough.push(this.chessboard.getSquare(this.row, this.col + 2));

        if (this._areSquaresAttackedByEnemy(squaresKingGoesThrough))
            return false;
        return true;
    }

    this.canLongCastle = function () {
        // () Neither the king nor the chosen rook has previously moved.
        // () There are no pieces between the king and the chosen rook.
        // () The king is not currently in check.
        // () The king does not pass through a square that is attacked by an enemy piece.
        // () The king does not end up in check. (True of any legal move.)
        if (this._wereKingOrRookMoved())
            return false;

        if (!this._isLongCastlePathFree())
            return false;

        var squaresKingGoesThrough = [];
        squaresKingGoesThrough.push(this.chessboard.getSquare(this.row, this.col - 1));
        squaresKingGoesThrough.push(this.chessboard.getSquare(this.row, this.col - 2));

        if (this._areSquaresAttackedByEnemy(squaresKingGoesThrough))
            return false;

        return true;
    }

    this._areSquaresAttackedByEnemy = function (listSquares) {
        var attackedSquares = this.chessboard.getSquaresAttackedBy(!this.isWhite);

        for (var i = 0; i < attackedSquares.length; i++) {
            var attackedSquare = attackedSquares[i];

            for (var j = 0; j < listSquares.length; j++) {
                var square = listSquares[j];

                if (attackedSquare.row == square.row && attackedSquare.col == square.col)
                    return true;
            }
        }

        return false;
    }

    this._isShortCastlePathFree = function () {
        var piece1 = this.chessboard.getPiece(this.row, this.col + 1);
        var piece2 = this.chessboard.getPiece(this.row, this.col + 2);

        //if there are no pieces in the right squares
        return piece1 == null && piece2 == null;
    }

    this._isLongCastlePathFree = function () {
        var p1 = this.chessboard.getPiece(this.row, this.col - 1);
        var p2 = this.chessboard.getPiece(this.row, this.col - 2)
        var p3 = this.chessboard.getPiece(this.row, this.col - 3)

        //if there are no pieces in the left squares
        return p1 == null && p2 == null && p3 == null;
    }

    this._wereKingOrRookMoved = function () {
        //check rook and king were not moved
        if (this.wasMoved)
            return true;

        var rook = this._getRook();

        if (rook == null) //this means it was captured or does not exists, i can't castle
            return true;

        if (rook.wasMoved)
            return true;
        return false;
    }

    this._getRook = function () {
        var pieces = this.chessboard.getPieces(this.isWhite);
        var rook = null;

        for (var i = 0; i < pieces.length; i++)
            if (pieces[i] instanceof Rook)
                rook = pieces[i];

        return rook;
    }

}