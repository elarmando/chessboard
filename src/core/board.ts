import King from "./king";
import Rook from "./rook";
import DataSquare from "./dataSquare";
import Square from "./square"
import Piece from "./piece";
import PieceMove from "./pieceMove";

export default class ChessBoard {
    MAX_COL:number;
    MAX_ROW:number;
    isWhiteTurn: boolean;
    squares: Square[][] = [];
    onAfterMove?: ()=> void;
 
  constructor()
  {
    this.MAX_COL = 7;
    this.MAX_ROW = 7;
    this.isWhiteTurn = true;
    this.squares = [];
    this.onAfterMove = null;
    this._init();
  }

  private _init () {
    this._createBoard();
  };

  private _createBoard () {
    this.squares = [];

    for (var i = 0; i < 8; i++) {
      var row: Square[] = [];
      this.squares.push(row);

      for (var j = 0; j < 8; j++) {
        row.push(new Square());
      }
    }
  };

  public clear(){
    this.squares = [];
    this._createBoard();
  }

  public setBlackTurn(){
    this.isWhiteTurn = false;
  }

  public setWhiteTurn(){
    this.isWhiteTurn = true;
  }

  public copy()
  {
    var newBoard = new ChessBoard();
    newBoard.isWhiteTurn = this.isWhiteTurn;
    newBoard.onAfterMove = this.onAfterMove;

    for(var i = 0; i < 8; i++)
    {
      for(var j = 0; j < 8; j++){
        var newSquare = this.squares[i][j].copy();
        newBoard.squares[i][j] = newSquare;

        if(newSquare.piece){
          newSquare.piece.chessboard = newBoard;
        }
      }
    }

    return newBoard;
  }

  public addPiece (squareStrings: string, piece: Piece) {
    var square = this.convertSquareString(squareStrings);

    var row = square.row;
    var col = square.col;

    if (row > 8 || row < 0) return;

    if (col > 8 || col < 0) return;

    var boardSquare = this.squares[row][col];

    if (piece) {
      boardSquare.piece = piece;
      piece.col = col;
      piece.row = row;
      piece.chessboard = this;
    }
  };

  public getPiece (row: number, col: number) {
    if (typeof row == "string") {
      var square = this.convertSquareString(row);

      if (square) {
        row = square.row;
        col = square.col;
      }
    }

    let sq: Square = this.squares[row][col];
    let piece = sq == undefined ? null : sq.piece;

    return piece;
  };

  public getSquare (row: number | string, col?: number) {
    let indexRow = 0, indexCol = 0;

    if(typeof row == "string"){
      var square = this.convertSquareString(row);

      if(square){
        indexRow = square.row;
        indexCol = square.col;
      }
    }
    else{
      indexRow = row;
      indexCol = col;
    }

    if (!this.squares[indexRow]) return;

    if (!this.squares[indexRow][indexCol]) return null;

    var piece = this.squares[indexRow][indexCol].piece;
    var dataSquare = new DataSquare(indexCol, indexRow, piece);

    return dataSquare;
  };

  private _internalMove (from: DataSquare | string, to: DataSquare | string) {  
    var fromSquare =
      from instanceof DataSquare ? from : this.convertSquareString(from);
    var toSquare = to instanceof DataSquare ? to : this.convertSquareString(to);

    if (fromSquare == null && toSquare != null) throw "invalid move";

    var square = this.squares[fromSquare.row][fromSquare.col];
    var destSquare = this.squares[toSquare.row][toSquare.col];

    if (
      square == null ||
      square == undefined ||
      destSquare == null ||
      destSquare == undefined
    )
      throw "invalid square";

    if (square.piece == null || square.piece == undefined)
      throw "no piece to move";

    var piece = square.piece;

    square.piece = null;
    piece.wasMoved = true;
    destSquare.piece = piece;

    piece.col = toSquare.col;
    piece.row = toSquare.row;
  };

  public move (from: DataSquare | string, to: DataSquare | string) {
    var fromSquare = from instanceof DataSquare ? from : this.convertSquareString(from);
    var toSquare = to instanceof DataSquare ? to : this.convertSquareString(to);

    if (fromSquare == null && toSquare != null)
      throw "invalid move";

    if(this._isCastle(fromSquare, toSquare))
    {
      //make king move
      this._internalMove(from, to);

      //make rook move
      var rookCol = toSquare.col == 6? 7 : 0;
      var rookDestCol = toSquare.col == 6? 5: 3;
      var rookSquare = this.getSquare(fromSquare.row, rookCol); 
      var rookDestSquare = this.getSquare(fromSquare.row, rookDestCol);

      if(rookSquare.piece instanceof Rook)
      {
        this._internalMove(rookSquare, rookDestSquare);
      }

    }
    else
    {
      this._internalMove(from, to);
    }

    
    this.isWhiteTurn = !this.isWhiteTurn;

    if (this.onAfterMove instanceof Function) this.onAfterMove();
  };

  

  public isCheck (isWhite: boolean) {
    if(isWhite === undefined)
      isWhite = this.isWhiteTurn;
    
    var myPieces = this.getPieces(isWhite);
    var enemyPieces = this.getPieces(!isWhite);
    var myKing = this._findKing(myPieces);

    var isCheck = this._isPieceAttackingKing(myKing, enemyPieces);

    return isCheck;
  };

  isCheckMate () {
    /* 0) is check
        1) king can't scape
        2) can't capture the atacking piece
        3) can't place a piece between the atacking piece and the king  */

    if (!this.isCheck(this.isWhiteTurn)) return false;

    //1) king cant scape
    var myPieces = this.getPieces(this.isWhiteTurn);
    var king = this._findKing(myPieces);
    var kingPossibleMoves = king.getPossibleMoves();

    if (kingPossibleMoves.length > 0) return false;

    //2) can't capture the attacking piece
    var enemyPieces = this.getPieces(!this.isWhiteTurn);
    var piecesAttackingKing = [];

    //first i get the pieces attacking the king
    for (var i = 0; i < enemyPieces.length; i++)
      if (enemyPieces[i].isAttackingSquare(king.row, king.col))
        piecesAttackingKing.push(enemyPieces[i]);

    if (piecesAttackingKing.length == 1) {
      var attacker = piecesAttackingKing[0];
      //i can capture only one piece in my turn
      for (var i = 0; i < myPieces.length; i++) {
        var piece = myPieces[i];

        if (piece.isAttackingSquare(attacker.row, attacker.col)) {
          var from = this.convertPositionToString(piece.col, piece.row);
          var to = this.convertPositionToString(attacker.col, attacker.row);

          if (this.isValidMove(from, to))//i can capture. It is not checkmate
            return false;

        }
      }
    }

    //3)can't place a piece between the atacking piece and the king
    for (var i = 0; i < piecesAttackingKing.length; i++) {
      var attackingLine = piecesAttackingKing[i].getAttackedSquaresLine(king.col, king.row);

      for (var j = 0; j < myPieces.length; j++) {
        var myPiece = myPieces[j];

        if (!(myPiece instanceof King)) //skip king
        {
          for (var k = 0; k < attackingLine.length; k++) {
            var lineSquare = attackingLine[k];
            if (myPiece.isPossibleToMoveTo(lineSquare.col, lineSquare.row)) {
              var from = this.convertPositionToString(myPiece.col, myPiece.row);
              var col = this.convertPositionToString(lineSquare.col, lineSquare.row);

              if (this.isValidMove(from, col))
                return false;
            }
          }
        }
      }
    }

    return true;
  };

  /*private _getKing (isWhite: boolean) {
    var pieces = this.getPieces(isWhite);
    var king = null;

    this.forEachPiece((e: Piece) => {
      if (e instanceof King) king = e;
    });

    return king;
  };*/

  private _isPieceAttackingKing (king: Piece, pieces: Piece[]) {
    var isCheck = false;

    for (var i = 0; i < pieces.length && !isCheck; i++) {
      var squares = pieces[i].getAttackedSquares();

      for (var s = 0; s < squares.length && !isCheck; s++) {
        var square = squares[s];

        if (square.col == king.col && square.row == king.row) isCheck = true;
      }
    }
    return isCheck;
  };

  private _findKing (pieces: Piece[]) {
    var king = null;

    for (var i = 0; i < pieces.length; i++) {
      if (pieces[i] instanceof King) {
        king = pieces[i];
        break;
      }
    }

    return king;
  };

  public getBlackPieces () {
    return this.getPieces(false);
  };

  public getWhitePieces () {
    return this.getPieces(true);
  };

  public getPieces (isWhite: boolean) {
    var pieces: Piece[] = [];

    this.forEachPiece(function (piece: Piece) {
      if (piece.isWhite == isWhite) {
        pieces.push(piece);
      }
    });

    return pieces;
  };

  private _isCastle (fromSquare: {col: number, row: number}, toSquare: {col: number, row: number}) {
    var squareOrig = this.squares[fromSquare.row][fromSquare.col];

    if (squareOrig.piece == null || !(squareOrig.piece instanceof King))
      return false;

    var isFirstRank = fromSquare.row == toSquare.row && toSquare.row == 0 || toSquare.row == 7;
    var isCastleColumn = toSquare.col == 6 || toSquare.col == 2;
    var isKingOriginalPosition = fromSquare.col == 4;

    return isFirstRank && isKingOriginalPosition && isCastleColumn;
  }

  isValidMove (from: DataSquare | string, to: DataSquare | string) {
    var fromSquare = null;
    var toSquare = null;

    if (from instanceof DataSquare)
      fromSquare = { col: from.col, row: from.row };
    else fromSquare = this.convertSquareString(from);

    if (to instanceof DataSquare) toSquare = { col: to.col, row: to.row };
    else toSquare = this.convertSquareString(to);

    if (fromSquare == null) return false;

    var pieceOrig = this.squares[fromSquare.row][fromSquare.col];
    var pieceDest = this.squares[toSquare.row][toSquare.col];

    if (pieceOrig == null) return false;

    if (pieceOrig.piece == null) return false;

    //we cant move if is not our turn
    if (pieceOrig.piece != null && pieceOrig.piece.isWhite != this.isWhiteTurn)
      return false;

    //we cant take a piece of the same colour
    if (
      pieceDest.piece != null &&
      pieceDest.piece.isWhite == pieceOrig.piece.isWhite
    )
      return false;

    var pieceMovedColor = pieceOrig.piece.isWhite;

    var dataOrig = new DataSquare(
      fromSquare.col,
      fromSquare.row,
      pieceOrig ? pieceOrig.piece : null
    );
    var dataDest = new DataSquare(
      toSquare.col,
      toSquare.row,
      pieceDest ? pieceDest.piece : null
    );

    var validMove = pieceOrig.piece.isValidMove(dataOrig, dataDest);

    if (validMove) {
      var backupPiece = pieceDest.piece;
      this._internalMove(from, to);

      if (this.isCheck(pieceMovedColor)) {
        //cant move because is check
        validMove = false;
      }

      this._internalMove(to, from); //restore movement

      //this is to recover the piece, if there was any in the "to" square
      if (backupPiece != null)
        this.squares[toSquare.row][toSquare.col].piece = backupPiece;
    }

    return validMove;
  };

  forEachPiece (callback: Function) {
    if (!(callback instanceof Function)) return;

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var square = this.getSquare(i, j);
        var piece = square.piece;

        if (piece != null) callback(piece);
      }
    }
  };

  getSquaresProtectedBy(protectedByWhite: boolean) {
    protectedByWhite = protectedByWhite === undefined ? true : protectedByWhite;
    var squares: DataSquare[] = [];

    this.forEachPiece((piece: Piece) => {
      if (piece.isWhite == protectedByWhite) {
        var sqs = piece.getProtectedSquares();
        sqs.forEach((e) => {
          squares.push(e);
        });
      }
    });

    return squares;
  }

  getSquaresAttackedBy (attackedByWhite: boolean) {
    attackedByWhite = attackedByWhite === undefined ? true : attackedByWhite;
    var squares: DataSquare[] = [];

    this.forEachPiece((piece: Piece) => {
      if (piece.isWhite == attackedByWhite) {
        var sqs = piece.getAttackedSquares();
        sqs.forEach((e) => {
          squares.push(e);
        });
      }
    });

    return squares;
  };

  public getMoves()
  {
    return this._getValidMoves();
  }

  _getValidMoves(){
    var moves = this._getMoves();
    var validMoves: PieceMove[] = [];

    moves.forEach(e => {
      if (this.isValidMove(e.squareFrom, e.squareTo))
        validMoves.push(e);
    });

    return validMoves;
  }

  _getMoves() {
    var pieces = this.getPieces(this.isWhiteTurn);
    var listOfMoves = [];

    for (var i = 0; i < pieces.length; i++) {
      var piece = pieces[i];
      var moves = piece.getPossibleMoves();

      for (var j = 0; j < moves.length; j++) {
        var squareFrom = new DataSquare(piece.col, piece.row);
        var squareTo = moves[j];
        listOfMoves.push(new PieceMove(squareFrom, squareTo));
      }
    }

    return listOfMoves;
  }

  convertPositionToString(col: number, row: number) {
    var cols = {
      0: "a",
      1: "b",
      2: "c",
      3: "d",
      4: "e",
      5: "f",
      6: "g",
      7: "h",
    } as any;

    var rows = {
      7: "8",
      6: "7",
      5: "6",
      4: "5",
      3: "4",
      2: "3",
      1: "2",
      0: "1",
    } as any;

    var res = null;

    if (cols[col] != undefined && rows[row] != undefined) {
      res = cols[col] + rows[row];
    }

    return res;
  };

  getMaxCol() {
    return this.MAX_COL;
  };

  getMaxRow() {
    return this.MAX_ROW;
  };

  convertSquareString(square: string){
    var cols = {
      a: 0,
      b: 1,
      c: 2,
      d: 3,
      e: 4,
      f: 5,
      g: 6,
      h: 7,
    } as any;

    var rows = {
      8: 7,
      7: 6,
      6: 5,
      5: 4,
      4: 3,
      3: 2,
      2: 1,
      1: 0,
    }as any;

    if (square.length != 2) return null;

    var col = cols[square.charAt(0)];
    var row = rows[square.charAt(1)];

    if (col == undefined || row == undefined) return null;

    //return this.getSquare(row, col);
    return { col: col, row: row };
  };
}

