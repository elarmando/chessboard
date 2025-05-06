import ChessBoard from "../core/board";
import Computer, {CheckMate, SearchMove} from "../core/computer";
import Position from "../core/position"
import Annotations, { AnnotationMove } from "./annotations";
import ChessboardIU from "../core/ui";

(function(){

    var chessboard: ChessBoard = null;
    var ui: ChessboardIU = null;
    var submitFenId = "fen-submit";
    var textAreaFen = "fen-textarea";
    var nextMoveButtonId = "btn-next";
    var previousMoveButtonId = "btn-previous";
    var checkMateButtonId = "find-checkmate";
    var defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    var mateFen = "8/8/8/2Q5/8/r7/k1K5/8 w - - 0 1";
    var previousBoards: ChessBoard[] = [];

    var movesFound: SearchMove[] = [];
    var currentMoveIndex = -1;

    var annotations = new Annotations();

    var init =  function()
    {
        initHandlers();

        chessboard = new ChessBoard();
        ui = new ChessboardIU(".chessboard", chessboard);

        let position = new Position();
        position.setupFromFen(mateFen, chessboard);

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

        var previousMoveButtton = document.getElementById(previousMoveButtonId);
        previousMoveButtton.addEventListener("click", previousMove);
    }

    var onSetupFen = function(e: any)
    {
        e.preventDefault();
        var textArea = document.getElementById(textAreaFen) as any;
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
            currentMoveIndex = -1;
            updateAnnotations();
        }
        else{
            alert("check mate not found");
        }

        console.log("find checkmate");
    }

    var updateAnnotations = function(){
        if(movesFound === null)
            return;

        annotations.updateMoves(movesFound);
    }

    var nextMove = function(){
        if(movesFound.length == 0)
            return;

        if(currentMoveIndex + 1 >= movesFound.length)
            return;

        currentMoveIndex++;

        var move = movesFound[currentMoveIndex];

        if(move){
            var copy = chessboard.copy();
            previousBoards.push(copy);

            chessboard.move(move.squareFrom, move.squareTo);
            annotations.next();

            annotations.draw();
            ui.draw();
        }
    }

    var previousMove = function(){
        if(currentMoveIndex <= 0)
            return;

        var previousBoard = previousBoards.pop();

        if(previousBoard !== undefined){
            currentMoveIndex--;
            chessboard = previousBoard;

            ui.updateBoard(chessboard);
            annotations.previous();

            annotations.draw();
            ui.draw();
        }


    }

    window.onload  = init;
})();