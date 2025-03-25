import DraggPieces from "./draggPiecesUI"


export default class ChessboardIU
{
    container:any;
    elem:any = null;
    chessboard:any;
    dragPieces:any = null;
    
    pickedPiece:any = null;
    originPickedPiece:any = null;

    constructor(selector:any, chessboard:any){
        this.container = selector;
        this.chessboard = chessboard;

        this._init();
    }

   draw()
    {
        var chessboard = this.chessboard;
          var squares = document.querySelectorAll(this.container + " .row .square");

         for(var i = 0; i < squares.length; i++ )
         {
         
                var domSquare = squares[i];
                var col = i % 8; 
                var row = Math.floor( i / 8);
                
                var r = chessboard.squares[7 - row];
                var sq = r[col];

                if(sq.piece == null)
                {
                    domSquare.innerHTML = "";
                }
                else
                {
                    var className = "piece " + sq.piece.className;
                    domSquare.innerHTML = "<div class='" + className + "'> </div>";
                }

         }
    }


   
    _init()
    {
        this.dragPieces = new DraggPieces(this.container);
        this.dragPieces.OnDropPiece = (e:any)=> this.OnDroppedPiece(e)
        this.dragPieces.OnPickPiece = (e:any, e1:any) => this.OnPickPiece(e, e1);
    }

    _drawAttacked(squares:any[])
    {
        squares.forEach(s => {
          var elem = this._getSquare(s.col, s.row);
          
          if(elem)
          {
              elem.className += " attacked";
          }
          
        });
    }

    _drawUnattacked()
    {
        var squares = document.querySelectorAll(this.container + " .row .square");

        for(var i = 0; i < squares.length; i++)
        {
            var square = squares[i];

            var index = square.className.indexOf("attacked");
            
            if(index > -1)
            {
                var firstPart =  square.className.substring(0, index );
                var secondPart =  square.className.substring(index + 8, square.className.length );

                square.className = firstPart + " " + secondPart;

            }


        }
    }

    _getSquare(col:number, row:number)
    {
        var id = this.chessboard.convertPositionToString(col, row);
        var squareElem = null;
        
        if(id)
        {
            squareElem = document.getElementById(id);
        }
        
        return squareElem;
    }
    
    OnDroppedPiece( square:any)
    {
        var clone = this.pickedPiece.cloneNode(true);
        
        if(square == null)//if the piece wasn't dropped on a square, move the piece to the original square
        {
            this.originPickedPiece.appendChild(clone);
        }
        else{
        
            var originSquareString = this.getSquareString(this.originPickedPiece);
            var destinySquareString = this.getSquareString(square);

            if(this.chessboard.isValidMove(originSquareString, destinySquareString))
            {
                if(square.children.length > 0)
                    square.removeChild(square.children[0]);
                    
                square.appendChild(clone);
                    
                this.chessboard.move(originSquareString, destinySquareString);

                if(this.chessboard.isCheckMate())
                    window.alert("Check mate");

                this.draw();
            }
            else
            {
                this.originPickedPiece.appendChild(clone);
            }
        }

        this._drawUnattacked();
        
       this.pickedPiece.remove();
       this.pickedPiece = null;
       this.originPickedPiece = null;
    }
    
    OnPickPiece(pickecPiece:any, originSquare:any )
    {
        var originSquareString = this.getSquareString(originSquare);
        
        var piece = this.chessboard.getPiece(originSquareString);
        
        if(piece != null)
        {
            var squares = piece.getPossibleMoves(this.chessboard);
            this._drawAttacked(squares);
        }


        this.originPickedPiece = originSquare;
        this.pickedPiece = pickecPiece.cloneNode(true);
        pickecPiece.remove();
    }

    getSquareString(square:any)
    {
        return square.id;
    }
}
