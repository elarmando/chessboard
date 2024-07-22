export default class Annotations{
    id;
    classList;
    moves;
    chessboard;

    constructor(){
        this.id = ".annotations";
        this.classList = ".moves"
        this.moves = [
            {white: "Bxf7+", black: "Txf7"},
            {white: "Cxf7", black: "Kxf7"},
            {white: "Cg5+", black: null},
        ];
    }

    draw(){
        let newHtml = "";

        for(let i = 0; i < this.moves.length; i ++){
            let move = this.moves[i];

            let whiteMove = "<span>" + (move.white ?? "") + "</span>";
            let blackMove = "<span>" + (move.black ?? "") + "</span>"
            newHtml += "<li> " + whiteMove + ",  " + blackMove + "</li>"
        }

        var element = document.querySelector(this.id + " " + this.classList);
        element.innerHTML = newHtml;
    }
}