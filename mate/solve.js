import ChessBoard from "../js/board.js";
import Computer from "../js/computer.js";
import Position from "../js/position.js"

(function(){

    var chessboard = null;
    var ui = null;
    var submitFenId = "fen-submit";
    var textAreaFen = "fen-textarea";
    var defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    var mateFen = "8/8/8/8/2Q5/8/1k1K4/8 w - - 0 1";


    var init =  function()
    {
        initHandlers();

        chessboard = new ChessBoard();
        ui = new ChessboardIU(".chessboard", chessboard);

        let position = new Position();
        position.setupFromFen(mateFen, chessboard);

        ui.draw();
        
    }

    var initHandlers = function()
    {
        var submitFen = document.getElementById(submitFenId);
        submitFen.addEventListener("click", onSetupFen, false);
    }

    var onSetupFen = function(e)
    {
        e.preventDefault();
        var textArea = document.getElementById(textAreaFen);
        var txt = textArea.value;

        let position = new Position();
        position.setupFromFen(txt, chessboard);
        ui.draw();
    }

    window.onload  = init;
})();