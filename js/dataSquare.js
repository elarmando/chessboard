export default function DataSquare(col, row, piece) {
    this.col = col;
    this.row = row;
    this.piece = piece;
  
    this.isEqual = function (square) {
      if (!(square instanceof DataSquare)) return false;
  
      return square.col == this.col && square.row == this.row;
    };
  }