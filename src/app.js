import ChessBoard from "./core/board";
import Computer from "./core/computer";
import Position from "./core/position";
import ChessboardIU from "./core/ui";

(function(){

    var chessboard = null;
    var ui = null;


    var init =  function()
    {
        chessboard = new ChessBoard();
        ui = new ChessboardIU(".chessboard", chessboard);

        let position = new Position();
        position.setupDefault(chessboard);
        //position.setupFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", chessboard);
        //position.setupFromFen("8/8/8/1Q6/8/8/k1K5/8 w - - 0 1", chessboard);
        //position.setupFromFen("5NR1/5BKP/8/4b1k1/8/8/8/8 b - - 0 1", chessboard);
        //position.setupFromFen("8/7b/1k6/1q6/8/8/KPP5/2B5 b - - 0 1", chessboard);
        //chessboard.setBlackTurn();

        ui.draw();
        
        var computer = new Computer(chessboard);
        computer.isWhite = !chessboard.isWhiteTurn;
        
        chessboard.onAfterMove = function()
        {
            computer.move();
            ui.draw();
        } 
    }
    
    window.onload  = init;
})();
