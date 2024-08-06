
import Piece from "./piece";
import PIECES from "./pieces";
import Rook from "./rook";

export default class King extends Piece {
    constructor(isWhite) {
        super(isWhite);
        this.className = (isWhite) ? PIECES.L_KING : PIECES.D_KING;
    }

    copy()
    {
        var newPiece = new King(this.isWhite);
        this.copyBase(newPiece);

        return newPiece;
    }

    getAttackedSquares() {
        var protectedSquares = this.getProtectedSquares();
        var squares = this.removeSquaresWithSameColorPieces(protectedSquares);

        return squares;
    }

    getProtectedSquares(){
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

    getPossibleMoves() {
        var chessboard = this.chessboard;
        var attacked = this.getAttackedSquares();
        var filtered = [];
        var protectedByEnemy = chessboard.getSquaresProtectedBy(!this.isWhite);

        attacked.forEach( (e)=> {

            var sameColorPiece = (e.piece && e.piece.isWhite == this.isWhite);

            if (e != null && !sameColorPiece) {
                var isSquareAttacked = false;

                for (var i = 0; i < protectedByEnemy.length && isSquareAttacked == false; i++) {
                    var squaredAttacked = protectedByEnemy[i];

                    if (e.isEqual(squaredAttacked))
                        isSquareAttacked = true;
                }

                if (!isSquareAttacked)
                    filtered.push(e);
            }
        });

        //remove moves if the target square is on X ray with some piece
        filtered = this._removeMovesIfSquareIsOnXRay(filtered);

        var isCheck = this.chessboard.isCheck(this.isWhite);

        if (!isCheck) //i cant castle in check
        {
            //add clastle
            if (this.canShortCastle())
                filtered.push(this.chessboard.getSquare(this.row, this.col + 2));

            if (this.canLongCastle())
                filtered.push(this.chessboard.getSquare(this.row, this.col - 2));
        }

        return filtered;
    }

    canShortCastle() {
        // () Neither the king nor the chosen rook has previously moved.
        // () There are no pieces between the king and the chosen rook.
        // () The king is not currently in check.
        // () The king does not pass through a square that is attacked by an enemy piece.
        // () The king does not end up in check. (True of any legal move.)
        if (this._wereKingOrRookMoved())
            return false;

        if (!this._isShortCastlePathFree())
            return false;

        var squaresKingGoesThrough = [];
        squaresKingGoesThrough.push(this.chessboard.getSquare(this.row, this.col + 1));
        squaresKingGoesThrough.push(this.chessboard.getSquare(this.row, this.col + 2));

        if (this._areSquaresProtectedByEnemy(squaresKingGoesThrough))
            return false;
        return true;
    }

    canLongCastle() {
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

        if (this._areSquaresProtectedByEnemy(squaresKingGoesThrough))
            return false;

        return true;
    }

    _areSquaresProtectedByEnemy(listSquares) {
        var protectedByEnemy = this.chessboard.getSquaresProtectedBy(!this.isWhite);

        for (var i = 0; i < protectedByEnemy.length; i++) {
            var protectedSquare = protectedByEnemy[i];

            for (var j = 0; j < listSquares.length; j++) {
                var square = listSquares[j];

                if (protectedSquare.row == square.row && protectedSquare.col == square.col)
                    return true;
            }
        }

        return false;
    }

    _isShortCastlePathFree() {
        var piece1 = this.chessboard.getPiece(this.row, this.col + 1);
        var piece2 = this.chessboard.getPiece(this.row, this.col + 2);

        //if there are no pieces in the right squares
        return piece1 == null && piece2 == null;
    }

    _isLongCastlePathFree() {
        var p1 = this.chessboard.getPiece(this.row, this.col - 1);
        var p2 = this.chessboard.getPiece(this.row, this.col - 2)
        var p3 = this.chessboard.getPiece(this.row, this.col - 3)

        //if there are no pieces in the left squares
        return p1 == null && p2 == null && p3 == null;
    }

    _wereKingOrRookMoved() {
        //check rook and king were not moved
        if (this.wasMoved)
            return true;

        var rook = this._getRook();

        if (rook == null) //this means it was captured or does not exists, i can't castle
            return true;

        if (rook.wasMoved)
            return true;

        let originalPosition = this._getOriginalPosition();

        if(originalPosition.row !== this.row || originalPosition.col !== this.col)
            return true;

        return false;
    }

    _getRook() {
        var pieces = this.chessboard.getPieces(this.isWhite);
        var rook = null;

        for (var i = 0; i < pieces.length; i++)
            if (pieces[i] instanceof Rook)
                rook = pieces[i];

        return rook;
    }

    _removeMovesIfSquareIsOnXRay(moves){
        var filtered = [];
        var enemyPieces = this.chessboard.getPieces(!this.isWhite);

        for(let j = 0; j < moves.length; j++){
            let move = moves[j];
            let isOnXRay = false;

            for(let i = 0; i < enemyPieces.length && isOnXRay === false; i++){
                let piece = enemyPieces[i];

                if(piece.isSquareOnXRay(move.row, move.col)
                    && piece.isSquareOnXRay(this.row, this.col)) //i also need to check king: I should remove posible square if the king moves to that square and is check
                    isOnXRay = true;
            }


            if(!isOnXRay)
                filtered.push(move);
        }
        
        return filtered;
    }

    _getOriginalPosition(){
        return this.isWhite?{col: 4, row : 0}: {col: 4, row: 7};
    }
}