import ChessBoard from "../core/board";
import { SearchMove } from "../core/computer";

export default class Annotations{
    id: string;
    classList: string;
    moves: AnnotationMove[];
    chessboard: ChessBoard;
    nextButtonId: string;
    previousButtonId: string;
    currentMove:{index: number, color: string};

    constructor(){
        this.id = ".annotations";
        this.nextButtonId = ".nextButton";
        this.previousButtonId = ".previousButton";
        this.classList = ".moves"
        this.moves = [
        ];

        this.currentMove = {index: -1, color: "white"}
    }


    public updateMoves(moves: SearchMove[]){
        let movesFound = moves;
        if(movesFound === null)
            return;

        let annotationMoves = this.convert(moves);

        this.moves = annotationMoves;
        this.currentMove = {index: -1, color: "white"};
        this.draw();
    }

    public next() {
        if (this.currentMove.color == "black" && (this.currentMove.index + 1) >= this.moves.length)
            return;

        this.removeCurrentSelection();
        this.goNext();
        this.addCurrentSelection();
   }

   public previous(){
    if(this.currentMove.index == 0 && this.currentMove.color == "white")
        return;

    this.removeCurrentSelection();
    this.goPrevious();
    this.addCurrentSelection();
   }
    
    private convert(moves: SearchMove[]) : AnnotationMove[]
    {
        let movesFound = moves;
        var annotationMoves = [];

        //convert from SearchMove to 
        for(var i = 0; i < movesFound.length; i+=2){
            var whiteMove = movesFound[i];

            var annotationMove = new AnnotationMove();
            annotationMove.white = whiteMove.stringMove;

            if(i + 1 < movesFound.length){
                var blackMove = movesFound[i + 1];
                annotationMove.black = blackMove.stringMove;
            }

            annotationMoves.push(annotationMove);
        }

        return annotationMoves;
    }


    private goNext(){
        let { index, color } = this.currentMove;
        //update current to next data
        if (index < 0) {
            this.currentMove.index = 0;
            this.currentMove.color = "white";
        } else {
            if (color == "white") {
                this.currentMove.color = "black";
            }
            else {
                this.currentMove.index += 1;
                this.currentMove.color = "white";
            }
        }
    }

    private goPrevious(){
        let { index, color } = this.currentMove;
        //update current to next data
        if (index < 0) {
            this.currentMove.index = 0;
            this.currentMove.color = "white";
        } else {
            if (color == "black") {
                this.currentMove.color = "white";
            }
            else {
                this.currentMove.index -= 1;
                this.currentMove.color = "black";
            }
        }
    }

    private removeCurrentSelection(){
        let { index, color } = this.currentMove;

        if(index < 0)return;

        //remove class of previous move
        let currentMove = this.getMoveInDom(index, color);
        currentMove.className = currentMove.className.replace("current", "");
    }

    private addCurrentSelection() {
        if(this.currentMove.index < 0)return;

        //update class of current move
        let nextMove = this.getMoveInDom(this.currentMove.index, this.currentMove.color);
        nextMove.className += " current";
    }

    private getMoveInDom(index: number, color: string) {
        var cls = ".move_" + index + "." + color;
        var current = document.querySelector(cls);

        return current;
    }

    draw() {
        let newHtml = "";

        for (let i = 0; i < this.moves.length; i++) {
            let move = this.moves[i];

            let moveclasswhite = "move " + "move_" + i + " white";
            let moveclassblack = "move " + "move_" + i + " black";

            let whiteMove = "<span class='" + moveclasswhite + "'>" + (move.white ?? "") + "</span>";
            let blackMove = "<span class='" + moveclassblack + "'>" + (move.black ?? "") + "</span>"
            newHtml += "<li> " + whiteMove + ",  " + blackMove + "</li>"
        }

        var element = document.querySelector(this.id + " " + this.classList);
        element.innerHTML = newHtml;

        this.addCurrentSelection();
    }
}

export class AnnotationMove{
    public white:string;
    public black:string;
}