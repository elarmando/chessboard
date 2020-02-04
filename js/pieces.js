function Piece(iswhite) {
    this.className;
    this.isWhite = iswhite;
    this.wasMoved = false;
    this.row = undefined;
    this.col = undefined;

    this.isValidMove = function (origRow, origCol, destRow, destCol) {
        return true;
    }

    this.getAttackedSquares = function (chessboard) {

        return [];
    }

    this.getPossibleMoves = function (chessboard) {
        return [];
    }
}

function Pawn(isWhite) {
    var self = this;
    Piece.call(this, isWhite);
    this.direction = (isWhite) ? 1 : -1;
    this.className = (isWhite) ? PIECES.L_PAWN : PIECES.D_PAWN;

    this.getAttackedSquares = function (chessboard) {
        var squares = [];

        if (this.col != undefined && this.row != undefined) {
            squares.push(chessboard.getSquare(this.row + this.direction * 1, this.col + 1));
            squares.push(chessboard.getSquare(this.row + this.direction * 1, this.col - 1));
        }

        return squares;
    }

    this.getPossibleMoves = function (chessboard) {

        var possible = [];
        var attacked = this.getAttackedSquares(chessboard);

        //attacked squares are possible if there is a different color piece
        attacked.forEach(e => {

            if (e.piece != null && e.piece.isWhite != self.isWhite)
                possible.push(e);
        });


        var nextSquare2 = chessboard.getSquare(this.row + 2, this.col);
        var nextSquare = chessboard.getSquare(this.row + 1, this.col);


        if (nextSquare.piece == null) {
            possible.push(nextSquare);

            if (!this.wasMoved && nextSquare2 != null && nextSquare2.piece == null) {
                possible.push(nextSquare2);
            }
        }

        return possible;
    }

    this.isValidMove = function (dataSquareOrig, dataSquareDest, chessboard) {
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

function King(isWhite) {
    var self = this;
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_KING : PIECES.D_KING;

    this.isValidMove = function (squareOrig, squareDest, chessboard) {
        var origRow = squareOrig.row;
        var origCol = squareOrig.col;
        var destCol = squareDest.col;
        var destRow = squareDest.row;

        if ((Math.abs(origRow - destRow) <= 1) && (Math.abs(origCol - destCol) <= 1)) {
            return true;
        }

        return false;
    }

    this.getAttackedSquares = function (chessboard) {
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

    this.getPossibleMoves = function (chessboard) {
        var attacked = this.getAttackedSquares(chessboard);

        debugger;

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

function Queen(isWhite) {
    var self = this;
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_QUEEN : PIECES.D_QUEEN;


    this.isValidMove = function (squareOrig, squareDest, chessboard) {
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


    this.getAttackedSquares = function (chessboard) {
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

    this.getPossibleMoves = function (chessboard) {
        var attacked = this.getAttackedSquares(chessboard);
        return attacked;
    }
}

function Bishop(isWhite) {
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_BISHOP : PIECES.D_BISHOP;

    this.isValidMove = function (squareOrig, squareDest, chessboard) {
        var origRow = squareOrig.row;
        var destRow = squareDest.row;
        var origCol = squareOrig.col;
        var destCol = squareDest.col;

        if (Math.abs(origRow - destRow) == Math.abs(origCol - destCol))
            return true;

        return false;
    }
}
function Knight(isWhite) {
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_KNIGHT : PIECES.D_KNIGHT;

    this.isValidMove = function (squareOrig, squareDest, chessboard) {
        var origRow = squareOrig.row;
        var destRow = squareDest.row;
        var origCol = squareOrig.col;
        var destCol = squareDest.col;

        if (Math.abs(origCol - destCol) == 2 && Math.abs(origRow - destRow) == 1)
            return true;

        if (Math.abs(origRow - destRow) == 2 && Math.abs(origCol - destCol) == 1)
            return true;

        return false;
    }

}

function Rook(isWhite) {
    Piece.call(isWhite);
    this.className = (isWhite) ? PIECES.L_ROOK : PIECES.D_ROOK;

    this.isValidMove = function (squareOrig, squareDest, chessboard) {
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
}

function PieceFactory() {
    this.createDarkBishop = function () {
        return new Bishop(false);
    }

    this.createLightBishop = function () {
        return new Bishop(true);
    }

    this.createDarkRook = function () {
        return new Rook(false);
    }

    this.createLightRook = function () {
        return new Rook(true);
    }

    this.createDarkKight = function () {
        return new Knight(false);
    }

    this.createLightKight = function () {
        return new Knight(true);
    }

    this.createDarkQueen = function () {
        return new Queen(false);
    }

    this.createLightQueen = function () {
        return new Queen(true);
    }

    this.createDarkKing = function () {
        return new King(false);
    }

    this.createLightKing = function () {
        return new King(true);
    }

    this.createDarkPawn = function () {
        return new Pawn(false);
    }

    this.createLightPawn = function () {
        return new Pawn(true);
    }
}

var PIECES =
{
    D_BISHOP: "piece-darkbishop",
    L_BISHOP: "piece-lightbishop",

    D_QUEEN: "piece-darkqueen",
    L_QUEEN: "piece-lightqueen",

    D_KNIGHT: "piece-darkknight",
    L_KNIGHT: "piece-lightknight",

    D_KING: "piece-darkking",
    L_KING: "piece-lightking",

    D_PAWN: "piece-darkpawn",
    L_PAWN: "piece-lightpawn",

    D_ROOK: "piece-darkrook",
    L_ROOK: "piece-lightrook"
}
