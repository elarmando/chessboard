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

    position.setupDefault(chessBoard);
    chessBoard.move("e2", "e4");
    chessBoard.move("d7", "d5");

    //var square1 = 
    //var utils = new Utils(chessBoard);

});

