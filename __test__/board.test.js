import Board from "../js/board.js"
import PieceFactory from "../js/PieceFactory.js"
import Pawn from "../js/pawn.js"

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