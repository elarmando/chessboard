export default class Annotations{
    id;
    classList;
    moves;
    chessboard;
    indexMove;

    constructor(){
        this.id = ".annotations";
        this.nextButtonId = ".nextButton";
        this.previousButtonId = ".previousButton";
        this.classList = ".moves"
        this.moves = [
            {white: "Bxf7+", black: "Txf7"},
            {white: "Cxf7", black: "Kxf7"},
            {white: "Cg5+", black: null},
        ];

        this.currentMove = {index: -1, color: "white"}

        var prevBtn = document.querySelector(this.previousButtonId);
        var nextBtn = document.querySelector(this.nextButtonId);

        prevBtn.addEventListener("click", () => this.onClickPreviousButton());
        nextBtn.addEventListener("click", () => this.onClickNextButton());
    }

    onClickPreviousButton(){
        console.log("previous button");
    }

    onClickNextButton(){
        if(this.currentMove.color == "black" && (this.currentMove.index + 1) >= this.moves.length)
            return;

        let {index, color} = this.currentMove;

        if(index >= 0){
            //remove class of previous move
            let currentMove = this.getMoveInDom(index, color);
            currentMove.className = currentMove.className.replace("current", "");
        }
      
        //update current to next data
        if(index < 0){
            this.currentMove.index = 0;
            this.currentMove.color = "white";
        }else{
            if (color == "white") {
                this.currentMove.color = "black";
            }
            else {
                this.currentMove.index += 1;
                this.currentMove.color = "white";
            }
        }

        //update class of current move
        let nextMove = this.getMoveInDom(this.currentMove.index, this.currentMove.color);
        nextMove.className += " current";
    }

    getMoveInDom(index, color) {
        var cls = ".move_" + index + "." + color;
        var current = document.querySelector(cls);

        return current;
    }

    draw() {
        let newHtml = "";

        for (let i = 0; i < this.moves.length; i++) {
            let move = this.moves[i];

            let moveclasswhite = "move " + "move_" + i +  " white";
            let moveclassblack = "move " + "move_" + i + " black";

            let whiteMove = "<span class='" + moveclasswhite + "'>" + (move.white ?? "") + "</span>";
            let blackMove = "<span class='" + moveclassblack + "'>" + (move.black ?? "") + "</span>"
            newHtml += "<li> " + whiteMove + ",  " + blackMove + "</li>"
        }

        var element = document.querySelector(this.id + " " + this.classList);
        element.innerHTML = newHtml;
    }
}