
function Pawn(isWhite) {
    var self = this;
    Piece.call(this, isWhite);
    this.direction = (isWhite) ? 1 : -1;
    this.className = (isWhite) ? PIECES.L_PAWN : PIECES.D_PAWN;

    this.getAttackedSquares = function () {
        var chessboard = this.chessboard;
        var squares = [];

        if (this.col != undefined && this.row != undefined) {
            squares.push(chessboard.getSquare(this.row + this.direction * 1, this.col + 1));
            squares.push(chessboard.getSquare(this.row + this.direction * 1, this.col - 1));
        }

        var filtered = [];

        squares.forEach(function(e){
            if(e)
                filtered.push(e);
        })

        return filtered;
    }

    this.getPossibleMoves = function () {
        var chessboard = this.chessboard;
        var possible = [];
        var attacked = this.getAttackedSquares(chessboard);

        //attacked squares are possible if there is a different color piece
        attacked.forEach(e => {

            if (e.piece != null && e.piece.isWhite != self.isWhite)
                possible.push(e);
        });


        var nextSquare2 = chessboard.getSquare(this.row + (this.direction * 2), this.col);
        var nextSquare = chessboard.getSquare(this.row + (this.direction * 1), this.col);


        if (nextSquare.piece == null) {
            possible.push(nextSquare);

            if (!this.wasMoved && nextSquare2 != null && nextSquare2.piece == null) {
                possible.push(nextSquare2);
            }
        }

        return possible;
    }

    this.isValidMove = function (dataSquareOrig, dataSquareDest) {
        if (this.canMoveForward(dataSquareOrig, dataSquareDest))
            return true;

        if (this.canMoveDiagonal(dataSquareOrig, dataSquareDest))
            return true;

        return false;
    }

    this.canMoveForward = function (dataSquareOrig, dataSquareDest) {
        /*
            pawn can move forward one square and two squares in the first movement
            only if destiny is a free square 
           */

        if (dataSquareOrig.col == dataSquareDest.col) {
            var increment = this.direction * 1;
            var origRow = dataSquareOrig.row;
            var destRow = dataSquareDest.row;

            if (origRow + increment == destRow && dataSquareDest.piece == null)
                return true;

            if (!self.wasMoved && origRow + (2 * increment) == destRow && dataSquareDest.piece == null)
                return true;
        }

        return false;
    }

    this.canMoveDiagonal = function (squareOrig, squareDest) {
        var dir = this.direction * 1;
        var isRighDiagonal = squareOrig.col == squareDest.col + 1 && squareOrig.row + dir == squareDest.row;
        var canCapture = squareDest.piece != null && squareDest.piece.isWhite != this.isWhite;

        if (isRighDiagonal && canCapture)
            return true;

        var isLeftDiagonal = squareOrig.col = squareDest.col - 1 && squareOrig.row + dir == squareDest.row;

        if (isLeftDiagonal && canCapture)
            return true;

        return false;
    }

}
