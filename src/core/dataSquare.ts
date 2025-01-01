export default class DataSquare {
    col:number;
    row:number;
    piece:any;
  
    constructor(col:number, row:number, piece:any)
    {
      this.col = col;
      this.row = row;
      this.piece = piece;
    }
  
    isEqual (square:DataSquare) {
      if (!(square instanceof DataSquare)) return false;
  
      return square.col == this.col && square.row == this.row;
    };
  }