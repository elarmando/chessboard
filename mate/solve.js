import ChessBoard from "../js/board.js";
import Computer, {CheckMate} from "../js/computer.js";
import Position from "../js/position.js"

(function(){

    var chessboard = null;
    var ui = null;
    var submitFenId = "fen-submit";
    var textAreaFen = "fen-textarea";
    var checkMateButtonId = "find-checkmate";
    var defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    var mateFen = "8/8/8/Q7/8/8/k1K5/8 w - - 0 1";


    var init =  function()
    {
        initHandlers();

        chessboard = new ChessBoard();
        ui = new ChessboardIU(".chessboard", chessboard);

        let position = new Position();
        position.setupFromFen(mateFen, chessboard);

        chessboard.setWhiteTurn();

        ui.draw();
        
    }

    var initHandlers = function()
    {
        var submitFen = document.getElementById(submitFenId);
        submitFen.addEventListener("click", onSetupFen, false);

        var checkMateButton = document.getElementById(checkMateButtonId);
        checkMateButton.addEventListener("click", findCheckMate);
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

    var findCheckMate = function(){
        var checkmate = new CheckMate();
        var solution = checkmate.search(chessboard);

        if(solution != null){
            console.log("solution found");
            console.log(solution);
        }

        console.log("find checkmate");
    }

    window.onload  = init;
})();