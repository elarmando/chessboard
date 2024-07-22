import ChessBoard from "../js/board.js";
import Computer, {CheckMate} from "../js/computer.js";
import Position from "../js/position.js"
import Annotations from "./annotations.js";

(function(){

    var chessboard = null;
    var ui = null;
    var submitFenId = "fen-submit";
    var textAreaFen = "fen-textarea";
    var nextMoveButtonId = "next-move";
    var checkMateButtonId = "find-checkmate";
    var defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    var mateFen = "8/8/8/2Q5/8/r7/k1K5/8 w - - 0 1";

    var movesFound = [];
    var currentMoveIndex = -1;

    var annotations = new Annotations();

    var init =  function()
    {
        initHandlers();

        chessboard = new ChessBoard();
        ui = new ChessboardIU(".chessboard", chessboard);

        let position = new Position();
        position.setupFromFen(mateFen, chessboard);

        //chessboard.setWhiteTurn();

        ui.draw();
        annotations.draw();
    }

    var initHandlers = function()
    {
        var submitFen = document.getElementById(submitFenId);
        submitFen.addEventListener("click", onSetupFen, false);

        var checkMateButton = document.getElementById(checkMateButtonId);
        checkMateButton.addEventListener("click", findCheckMate);

        var nextMoveButton =  document.getElementById(nextMoveButtonId);
        nextMoveButton.addEventListener("click", nextMove);
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
            console.log(solution);
            movesFound = solution;
            currentMoveIndex = 0;
        }
        else{
            alert("check mate not found");
        }

        console.log("find checkmate");
    }

    var nextMove = function(){
        if(movesFound.length == 0)
            return;

        var move = movesFound[currentMoveIndex];

        if(move){
            chessboard.move(move.squareFrom, move.squareTo);
            currentMoveIndex++;

            ui.draw();
        }

    }

    window.onload  = init;
})();