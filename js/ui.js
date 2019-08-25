function ChessboardIU(selector, chessboard)
{
    var self = this;
    this.container = selector;
    this.elem = null;
    this.chessboard = chessboard;

    var draggingElement = null;
    var isMouseDown = false;
    var squareOrigin = null;
    
    var mouseX = 0;
    var mouseY = 0;

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
    
    this._mouseDown = function(e)
    {
        //prevents the on drag start event, avoiding clonflics
        e.preventDefault();
        var square = this;
        var piece = square.querySelector(".piece");

        if(piece != null)
        {
            squareOrigin = square;
            console.log("Down");
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            isMouseDown = true;
            var rect = piece.getBoundingClientRect();
            
            draggingElement = piece.cloneNode(true);
            draggingElement.className += " dragging";
            draggingElement.style.top = rect.y + "px";
            draggingElement.style.left = rect.x + "px";

            document.body.appendChild(draggingElement);
            piece.remove();

            console.log("dragg created");
            document.body.addEventListener("mousemove", self._mouseMove, false);

        } 
    }
    
    this._mouseMove = function(e)
    {
        
        if(!isMouseDown)
        {
            console.log("not down");
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
        else
        {
           squareDestiny = squareOrigin;
        }
        
        var clone = draggingElement.cloneNode(true);
        
        clone.className = clone.className.replace("dragging", "");
        clone.style.top = '';
        clone.style.left = '';
            
        squareDestiny.appendChild(clone);
        
        draggingElement.remove();
        document.body.removeEventListener("mousemove", self._mouseMove, false);
        draggingElement = null;
        squareOrigin = null;
    }
    
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

       
        
        
    }

    this._init();
    
}