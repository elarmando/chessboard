
function ChessBoard() {
    var self = this;
    var MAX_COL = 7;
    var MAX_ROW = 7;

    this.isWhiteTurn = true;
    this.squares = [];
    this.onAfterMove = null;

    

    this._init = function () {
        this._createBoard();
    }

    this._createBoard = function () {
        this.squares = [];

        for (var i = 0; i < 8; i++) {
            var row = [];
            this.squares.push(row);

            for (var j = 0; j < 8; j++) {
                row.push(new Square());
            }
        }
    }

    this.addPiece = function (squareStrings, piece) {
        var square = convertSquareString(squareStrings);

        var row = square.row;
        var col = square.col;

        if (row > 8 || row < 0)
            return;

        if (col > 8 || col < 0)
            return;

        var square = this.squares[row][col];

        if (piece) {
            square.piece = piece;
            piece.col = col;
            piece.row = row;
            piece.chessboard = this;
        }

    }

    this.getPiece = function (row, col) {
        if (typeof row == "string") {
            var square = convertSquareString(row);

            if (square) {
                row = square.row;
                col = square.col;
            }
        }

        var piece = this.squares[row][col];
        piece = (piece == undefined) ? null : piece.piece;

        return piece;
    }

    this.getSquare = function (row, col) {
        if (!this.squares[row])
            return;

        if (!this.squares[row][col])
            return null;

        var piece = this.squares[row][col].piece;
        var dataSquare = new DataSquare(col, row, piece);

        return dataSquare;
    }

    this.move = function (from, to) {

        var fromSquare =(from instanceof DataSquare)? from : convertSquareString(from);
        var toSquare = (to instanceof DataSquare)? to: convertSquareString(to);

        if (fromSquare == null && toSquare != null)
            return;

        var square = this.squares[fromSquare.row][fromSquare.col];
        var destSquare = this.squares[toSquare.row][toSquare.col];

        if (square != null && square != undefined && destSquare != null && destSquare != undefined) {
            var piece = square.piece;

            if (piece != null) {
                square.piece = null;
                piece.wasMoved = true;
                destSquare.piece = piece;

                piece.col = toSquare.col;
                piece.row = toSquare.row;

                this.isWhiteTurn = !this.isWhiteTurn;

                if(self.onAfterMove instanceof Function)
                    self.onAfterMove();
            }

        }

    }

    this.isCheck = function (isWhite) {
        var myPieces = this.getPieces(isWhite);
        var enemyPieces = this.getPieces(!isWhite);
        var myKing = this._findKing(myPieces);
        
        var isCheck = this._isPieceAttackingKing(myKing, enemyPieces);
        
        return isCheck;
    }

    this._isPieceAttackingKing = function (king, pieces) {
        var isCheck = false;

        for (var i = 0; i < pieces.length && !isCheck; i++) {
            var squares = pieces[i].getAttackedSquares();

            for (var s = 0; s < squares.length && !isCheck; s++) {
                var square = squares[s];

                if (square.col == king.col && square.row == king.row)
                    isCheck = true;
            }
       }
        return isCheck;
    }

    this._findKing = function (pieces) {
        var king = null;

        for (var i = 0; i < pieces.length; i++) {
            if (pieces[i] instanceof King) {
                king = pieces[i];
                break;
            }
        }

        return king;
    }

    this.getBlackPieces = function () {
        return this.getPieces(false);
    }

    this.getWhitePieces = function () {
        return this.getPieces(true);
    }

    this.getPieces = function (isWhite) {
        var pieces = [];

        this.forEachPiece(function (piece) {

            if (piece.isWhite == isWhite) {
                pieces.push(piece);
            }
        });

        return pieces;
    }

    this.isValidMove = function (from, to) {
        var fromSquare = convertSquareString(from);
        var toSquare = convertSquareString(to);

        if (fromSquare == null)
            return false;


        var pieceOrig = this.squares[fromSquare.row][fromSquare.col];
        var pieceDest = this.squares[toSquare.row][toSquare.col];

        if (pieceOrig == null)
            return false;

        if (pieceOrig.piece == null)
            return false;

        //we cant move if is not our turn
        if (pieceOrig.piece != null && pieceOrig.piece.isWhite != this.isWhiteTurn)
            return false;

        //we cant take a piece of the same colour
        if (pieceDest.piece != null && pieceDest.piece.isWhite == pieceOrig.piece.isWhite)
            return false;

        var pieceMovedColor = pieceOrig.piece.isWhite;

        var dataOrig = new DataSquare(fromSquare.col, fromSquare.row, pieceOrig ? pieceOrig.piece : null);
        var dataDest = new DataSquare(toSquare.col, toSquare.row, pieceDest ? pieceDest.piece : null);

        var validMove = pieceOrig.piece.isValidMove(dataOrig, dataDest, this);
        
        if(validMove)
        {
            this.move(from, to);
            
            if(this.isCheck(pieceMovedColor)) //cant move because is check
            {
                validMove = false;
                this.move(to, from)
            }
        }

        return validMove;
    }

    this.forEachPiece = function (callback) {
        if (!(callback instanceof Function))
            return;

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var square = this.getSquare(i, j);
                var piece = square.piece;

                if (piece != null)
                    callback(piece);
            }
        }


    }

    this.getSquaresAttackedBy = function (attackedByWhite) {
        attackedByWhite = attackedByWhite === undefined ? true : attackedByWhite;
        var squares = [];

        this.forEachPiece(piece => {

            if (piece.isWhite == attackedByWhite) {
                var sqs = piece.getAttackedSquares(self);
                sqs.forEach(e => { squares.push(e) });
            }
        });

        return squares;
    }

    this.convertPositionToString = function (col, row) {
        var cols = {
            0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h'
        };

        var rows = {
            7: '8', 6: '7', 5: '6', 4: '5', 3: '4', 2: '3', 1: '2', 0: '1'
        }

        var res = null;

        if (cols[col] != undefined && rows[row] != undefined) {
            res = cols[col] + rows[row];
        }

        return res;
    }

    this.getMaxCol = function () {
        return MAX_COL;
    }

    this.getMaxRow = function () {
        return MAX_ROW;
    }

    var convertSquareString = function (square) {
        var cols = {
            'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7
        };

        var rows = {
            '8': 7, '7': 6, '6': 5, '5': 4, '4': 3, '3': 2, '2': 1, '1': 0
        }

        if (square.length != 2)
            return null;

        var col = cols[square.charAt(0)];
        var row = rows[square.charAt(1)];

        if (col == undefined || row == undefined)
            return null;

        return { col: col, row: row };
    }

    this._init();
}

function DataSquare(col, row, piece) {
    this.col = col;
    this.row = row;
    this.piece = piece;

    this.isEqual = function (square) {
        if (!(square instanceof DataSquare))
            return false;

        return square.col == this.col && square.row == this.row;
    }
}

function Square() {
    this.piece = null;
}

