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