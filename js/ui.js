function ChessboardIU(selector, chessboard)
{
    var self = this;
    this.container = selector;
    this.elem = null;
    this.chessboard = chessboard;

    var draggingElement = null;
    var isMouseDown = false;
    
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
        var square = this;
        var piece = square.querySelector(".piece");

        if(piece != null)
        {
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

            document.addEventListener("mousemove", self._mouseMove, true );
            document.addEventListener("mouseup", self._mouseUp, false);
            
        } 

    }
    
    this._mouseMove = function(e)
    {
       

        if(!isMouseDown)
            return;

        var deltaX = e.clientX - mouseX;
        var deltaY = e.clientY - mouseY;
        
        var rect = draggingElement.getBoundingClientRect();

        var newX = rect.x + deltaX;
        var newY = rect.y + deltaY;

        draggingElement.style.top = newY + "px";
        draggingElement.style.left = newX + "px";
        

        mouseX = e.clientX;
        mouseY = e.clientY;
        
            
    }
    
    this._mouseUp = function(e)
    {
        if(!isMouseDown)
            return;

        isMouseDown = false;

        var classTarget = e.currentTarget.className;

        if(classTarget != null && classTarget.includes("square"))
        {
            var clone = draggingElement.cloneNode(true);
            clone.className = clone.className.replace("dragging", "");
            
            e.currentTarget.appendChild(clone);
        }
        else
        {
            draggingElement.remove();

        }
        
        draggingElement.remove();
        draggingElement = null;
    }
    
    this._init = function()
    {
        this.elem = document.querySelectorAll(this.container);
        var squares = document.querySelectorAll(this.container + " .row .square");
        
        for(var i = 0; i < squares.length; i++)
        {
            var domSquare = squares[i];

            domSquare.addEventListener("mousedown", this._mouseDown, true);
            //domSquare.addEventListener("mouseup", this._mouseUp, false);
            //domSquare.addEventListener("mousemove", this._mouseMove, true);
        }
        
    }

    this._init();
    
}