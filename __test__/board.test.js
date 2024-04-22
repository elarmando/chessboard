import Board from "../js/board.js"
import PieceFactory from "../js/PieceFactory.js"
import Pawn from "../js/pawn.js"

import Position from "../js/position.js";

test('test 1', ()=>{
    let board = new Board();
    let pieceFactory = new PieceFactory();

    board.addPiece("e2", pieceFactory.createLightPawn());
    let piece = board.getPiece(1, 4);
    
    expect(piece instanceof Pawn).toBe(true);
    expect(piece.col == 4 && piece.row == 1).toBe(true);
});


test('valid moves shoud not contain queen capturing the king', ()=>{
    let board = new Board();
    let pieceFactory = new PieceFactory();

    board.addPiece("b2", pieceFactory.createDarkKing());
    board.addPiece("d2", pieceFactory.createLightKing());
    board.addPiece("b4", pieceFactory.createLightQueen());

    let moves = board.getMoves();

    console.log(moves);
    let index = moves.findIndex(e => e.squareFrom.col == 1 && e.squareFrom.row == 3 &&
                                    e.squareTo.col == 1 && e.squareTo.row == 1);

    expect(index).toBe(-1);
});

test("checkmate test", ()=>{
    let fen = "5rk1/7Q/8/8/8/3BK3/8/8 w - - 0 1";
    let board = new Board();
    let position = new Position();

    position.setupFromFen(fen, board);
    board.setBlackTurn();


    expect(board.isCheckMate()).toBe(true);
});

test("chesmate test - mate del pasillo", ()=>{
    let fen = "1R5k/6pp/8/8/8/8/8/3K4 w - - 0 1";
    let position = new Position();
    let board = new Board();
    
    position.setupFromFen(fen, board);
    board.setBlackTurn();

    expect(board.isCheckMate()).toBe(true);
})