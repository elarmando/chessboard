import {describe, expect, test} from '@jest/globals';
import Utils from '../src/core/utils';
import ChessBoard from '../src/core/board';
import Position from '../src/core/position';

test("Utils_getMoveAsString_pawnMove", () => {
    var chessBoard = new ChessBoard();
    var position = new Position();

    position.setupDefault(chessBoard);
    var utils = new Utils(chessBoard);
    var squarea2 = chessBoard.getSquare(1, 0);
    var squarea4 = chessBoard.getSquare(3, 0);

    var str = utils.getMoveAsString(squarea2, squarea4);

    expect(str).toBe("a4");
});

test("Utils_getMoveAsString_pawnTakes", () => {
    var chessBoard = new ChessBoard();
    var position = new Position();
    var utils = new Utils(chessBoard);  

    position.setupDefault(chessBoard);
    chessBoard.move("e2", "e4");
    chessBoard.move("d7", "d5");

    var square1 = chessBoard.getSquare("e4");
    var square2 = chessBoard.getSquare("d5");

    var str = utils.getMoveAsString(square1, square2);
    expect(str).toBe("exd5");   
});

test("Utils_getMoveAsString_knightMove", () => {
    var chessBoard = new ChessBoard();
    var position = new Position();
    var utils = new Utils(chessBoard);

    position.setupDefault(chessBoard);

    var g1 = chessBoard.getSquare("g1");
    var f3 = chessBoard.getSquare("f3");

    var str = utils.getMoveAsString(g1, f3);
    expect(str).toBe("Nf3");
});

test("Utils_getMoveAsString_knightTakes", () => {
    var chessBoard = new ChessBoard();
    var position = new Position();
    var utils = new Utils(chessBoard);

    position.setupDefault(chessBoard);

    chessBoard.move("g1", "f3");
    chessBoard.move("e7", "e5");

    var f3 = chessBoard.getSquare("f3");
    var e5 = chessBoard.getSquare("e5");

    var str = utils.getMoveAsString(f3, e5);
    expect(str).toBe("Nxe5");
});

test("Utils_getMoveAsString_BishopMove", () => {
    var chessBoard = new ChessBoard();
    var position = new Position();
    var utils = new Utils(chessBoard);

    position.setupDefault(chessBoard);

    chessBoard.move("e2", "e4");
    chessBoard.move("e7", "e5");

    var str = utils.getMoveAsString("f1", "c4"); 
    expect(str).toBe("Bc4");
});


test("Utils_getMoveAsString_BishopTakes", () => {
    var chessBoard = new ChessBoard();
    var position = new Position();
    var utils = new Utils(chessBoard);

    position.setupDefault(chessBoard);

    chessBoard.move("e2", "e4");
    chessBoard.move("b7", "b5");

    var str = utils.getMoveAsString("f1", "b5"); 
    expect(str).toBe("Bxb5");
});

test("Utils_getMoveAsString_QueenMoves", () => {
    var chessBoard = new ChessBoard();
    var position = new Position();
    var utils = new Utils(chessBoard);

    position.setupDefault(chessBoard);

    chessBoard.move("e2", "e4");
    chessBoard.move("e7", "e5");

    var str = utils.getMoveAsString("d1", "e2"); 
    expect(str).toBe("Qe2");
});

test("Utils_getMoveAsString_QueenTakes", () => {
    var chessBoard = new ChessBoard();
    var position = new Position();
    var utils = new Utils(chessBoard);

    position.setupDefault(chessBoard);

    chessBoard.move("e2", "e4");
    chessBoard.move("e7", "e5");
    chessBoard.move("c2", "c3");
    chessBoard.move("c8", "g4");

    var str = utils.getMoveAsString("d1", "g4"); 
    expect(str).toBe("Qxg4");
});

test("Utils_getMoveAsString_RookMoves", () => {
    var chessBoard = new ChessBoard();
    var position = new Position();
    var utils = new Utils(chessBoard);

    position.setupDefault(chessBoard);

    chessBoard.move("h2", "h4");
    chessBoard.move("e7", "e5");

    var str = utils.getMoveAsString("h1", "h2"); 
    expect(str).toBe("Rh2");
});

