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

        return filtered;
    }

}