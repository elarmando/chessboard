import ChessBoard from "./js/board.js";
import PieceFactory from "./js/PieceFactory.js";
import Computer from "./js/computer.js";
import Position from "./js/position.js"

(function(){

    var chessboard = null;
    var ui = null;


    var init =  function()
    {
        chessboard = new ChessBoard();
        ui = new ChessboardIU(".chessboard", chessboard);

        let position = new Position();
       // position.setupDefault(chessboard);
       debugger;
       position.setupFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", chessboard);

        ui.draw();
        
          var computer = new Computer(chessboard);
        computer.isWhite = false;
        
        chessboard.onAfterMove = function()
        {
            computer.move();
            ui.draw();
        } 
    }
    
    window.onload  = init;
})();