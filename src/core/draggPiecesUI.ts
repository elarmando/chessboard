

export default class DraggPieces
{
    OnPickPiece?: (e:any, e1:any)=>void = null;
    OnDropPiece: (e:any) =>void = null;
    container:any;
    elem:any = null;

    draggingElement: any = null;
    isMouseDown = false;
    squareOrigin:any = null;
    
    mouseX = 0;
    mouseY = 0;

    constructor(container:any){
        this.container = container;
        this._init();
    }

    _init()
    {
        this.elem = document.querySelectorAll(this.container);
        var squares = document.querySelectorAll(this.container + " .row .square");
        
        for(var i = 0; i < squares.length; i++)
        {
            var domSquare = squares[i];

            
            domSquare.addEventListener("mousedown",(e)=> this._mouseDown(e), true);
            domSquare.addEventListener("mouseup",(e)=> this._mouseUp(e), true);
        }
        
        document.body.addEventListener("mouseup", (e)=>this._mouseUp(e), false);
    }

    _mouseDown(e: any)
    {
        //prevents the on drag start event, avoiding clonflics
        e.preventDefault();
        
        var square = e.currentTarget;
        var piece = square.querySelector(".piece");

        if(piece != null)
        {
            this.squareOrigin = square;
            
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            this.isMouseDown = true;
            var rect = piece.getBoundingClientRect();
            
            this.draggingElement = piece.cloneNode(true);
            this.draggingElement.className += " dragging";
            this.draggingElement.style.top = rect.y + "px";
            this.draggingElement.style.left = rect.x + "px";

            document.body.appendChild(this.draggingElement);
           
            document.body.addEventListener("mousemove", (e)=> this._mouseMove(e), false);

            if(this.OnPickPiece instanceof Function)
                this.OnPickPiece(piece, this.squareOrigin);

        } 
    }
    
    _mouseMove(e:any)
    {
        if(!this.isMouseDown)
        {
            return;
        }

        let deltaX = e.clientX + this.mouseX;
        let deltaY = e.clientY - this.mouseY;
        
        let rect = this.draggingElement.getBoundingClientRect();

        let newX = rect.x + deltaX;
        let newY = rect.y + deltaY;

        this.draggingElement.style.top = newY + "px";
        this.draggingElement.style.left = newX + "px";

        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }
    
    _mouseUp(e:any)
    {
        if(!this.isMouseDown)
            return;
        
        //first stop the move event
      
        this.isMouseDown = false;

        //verify if the pieces was dropped in the a square
        var classTarget = e.currentTarget.className;
        var squareDestiny = null;

        if(classTarget != null && classTarget.includes("square"))
        {
            squareDestiny = e.currentTarget;
        }
       
        
        var clone = this.draggingElement.cloneNode(true);
        
        clone.className = clone.className.replace("dragging", "");
        clone.style.top = '';
        clone.style.left = '';
            
           
        this.draggingElement.remove();
        document.body.removeEventListener("mousemove", this._mouseMove, false);
        this.draggingElement = null;
        this.squareOrigin = null;
        
        if(this.OnDropPiece instanceof Function)
        {
            this.OnDropPiece(squareDestiny);
        }
    }
}