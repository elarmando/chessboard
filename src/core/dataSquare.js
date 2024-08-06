export default class DataSquare {
  
    constructor(col, row, piece)
    {
      this.col = col;
      this.row = row;
      this.piece = piece;
    }
  
    isEqual (square) {
      if (!(square instanceof DataSquare)) return false;
  
      return square.col == this.col && square.row == this.row;
    };
  }