
export default class Square {
    piece;

    constructor()
    {
      this.piece = null;
    }

    copy()
    {
      var newSquare = new Square();
      
      if(this.piece != null)
        newSquare.piece = this.piece.copy();

      return newSquare;
    }
  }
  