import DataSquare from "./dataSquare";

export default class PieceMove
{
    squareFrom: DataSquare;
    squareTo: DataSquare;

    constructor(squareFrom: DataSquare, squareTo: DataSquare){
        this.squareFrom = squareFrom;
        this.squareTo = squareTo;
    }
}