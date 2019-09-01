function ChessboardIU(selector, chessboard)
{
    var self = this;
    this.container = selector;
    this.elem = null;
    this.chessboard = chessboard;
    this.dragPieces = null;
    
    this.pickedPiece = null;
    this.originPickedPiece = null;

   this.draw = function(chessboard)
    {
        var chessboard = this.chessboard;
          var squares = document.querySelectorAll(this.container + " .row .square");

         for(var i = 0; i < squares.length; i++ )
         {
         
                var domSquare = squares[i];
                var col = i % 8; 
                var row = parseInt( i / 8);
                
                var r = chessboard.squares[row];
                var sq = r[col];

                if(sq.piece == null)
                {

                }
                else
                {
                    var className = "piece " + sq.piece.className;
                    domSquare.innerHTML = "<div class='" + className + "'> </div>";
                }

         }
    }
   
    this._init = function()
    {
        this.dragPieces = new DraggPieces(this.container);
        this.dragPieces.OnDropPiece = OnDroppedPiece;
        this.dragPieces.OnPickPiece = OnPickPiece;
    }
    
    var OnDroppedPiece = function( square)
    {
        var clone = self.pickedPiece.cloneNode(true);
        
        if(square == null)//if the piece wasn't dropped on a square, move the piece to the original square
        {
            self.originPickedPiece.appendChild(clone);
        }
        else{
        
            var originSquareString = getSquareString(self.originPickedPiece);
            var destinySquareString = getSquareString(square);

            if(self.chessboard.isValidMove(originSquareString, destinySquareString))
            {
                square.appendChild(clone);
                self.chessboard.move(originSquareString, destinySquareString);
            }
            else
            {
                self.originPickedPiece.appendChild(clone);
            }
        }
        
       self.pickedPiece.remove();
       self.pickedPiece = null;
       self.originPickedPiece = null;
    }
    
    var OnPickPiece = function(pickecPiece, originSquare )
    {
        self.originPickedPiece = originSquare;
        self.pickedPiece = pickecPiece.cloneNode(true);
        pickecPiece.remove();
    }

    var getSquareString = function(square)
    {
        return square.id;
    }

    this._init();
    
}

function DraggPieces(container)
{
    this.OnPickPiece = null;
    this.OnDropPiece = null;
    this.container = container;
    this.elem = null;

    var draggingElement = null;
    var isMouseDown = false;
    var squareOrigin = null;
    var self = this;
    
    var mouseX = 0;
    var mouseY = 0;

    this._init = function()
    {
        this.elem = document.querySelectorAll(this.container);
        var squares = document.querySelectorAll(this.container + " .row .square");
        
        for(var i = 0; i < squares.length; i++)
        {
            var domSquare = squares[i];

            
            domSquare.addEventListener("mousedown", this._mouseDown, true);
            domSquare.addEventListener("mouseup", this._mouseUp, true);
        }
        
        document.body.addEventListener("mouseup", this._mouseUp, false);
    }

   
    this._mouseDown = function(e)
    {
        //prevents the on drag start event, avoiding clonflics
        e.preventDefault();
        var square = this;
        var piece = square.querySelector(".piece");

        if(piece != null)
        {
            squareOrigin = square;
            
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            isMouseDown = true;
            var rect = piece.getBoundingClientRect();
            
            draggingElement = piece.cloneNode(true);
            draggingElement.className += " dragging";
            draggingElement.style.top = rect.y + "px";
            draggingElement.style.left = rect.x + "px";

            document.body.appendChild(draggingElement);
           
            document.body.addEventListener("mousemove", self._mouseMove, false);

            if(self.OnPickPiece instanceof Function)
                self.OnPickPiece(piece, squareOrigin);

        } 
    }
    
    this._mouseMove = function(e)
    {
        
        if(!isMouseDown)
        {
           
            return;
        }

        var deltaX = e.clientX - mouseX;
        var deltaY = e.clientY - mouseY;
        
        var rect = draggingElement.getBoundingClientRect();

        var newX = rect.x + deltaX;
        var newY = rect.y + deltaY;

        console.log("X:" + newX + ", Y:" + newY);

        draggingElement.style.top = newY + "px";
        draggingElement.style.left = newX + "px";
        

        mouseX = e.clientX;
        mouseY = e.clientY;
        
            
    }
    
    this._mouseUp = function(e)
    {
        if(!isMouseDown)
            return;
        
        //first stop the move event
      
        isMouseDown = false;

        //verify if the pieces was dropped in the a square
        var classTarget = e.currentTarget.className;
        var squareDestiny = null;

        if(classTarget != null && classTarget.includes("square"))
        {
            squareDestiny = e.currentTarget;
        }
       
        
        var clone = draggingElement.cloneNode(true);
        
        clone.className = clone.className.replace("dragging", "");
        clone.style.top = '';
        clone.style.left = '';
            
           
        draggingElement.remove();
        document.body.removeEventListener("mousemove", self._mouseMove, false);
        draggingElement = null;
        squareOrigin = null;
        
        if(self.OnDropPiece instanceof Function)
        {
            self.OnDropPiece(squareDestiny);
        }
    }
    
    this._init();
}

function ChessboardController()
{
    
}