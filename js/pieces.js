function Piece(iswhite)
{
    this.className;
    this.isWhite = iswhite;
    this.wasMoved = false;
    
    Piece.prototype.isValidMove  = function(origRow, origCol, destRow, destCol)
    {
       return true; 
    }
}

function Pawn(isWhite)
{
    var self = this;
    Piece.call(this, isWhite);
    this.direction = (isWhite) ? 1 : -1;
    this.className = (isWhite) ? PIECES.L_PAWN: PIECES.D_PAWN;
    
    this.isValidMove = function(dataSquareOrig, dataSquareDest, chessboard)
    {
        if(this.canMoveForward(dataSquareOrig, dataSquareDest))
            return true;

        if(this.canMoveDiagonal(dataSquareOrig, dataSquareDest))
            return true;
              
        return false;
    }

    this.canMoveForward = function(dataSquareOrig, dataSquareDest)
    {
     /*
         pawn can move forward one square and two squares in the first movement
         only if destiny is a free square 
        */
        
        if(dataSquareOrig.col == dataSquareDest.col)
        {
            var increment = this.direction * 1;
            var origRow = dataSquareOrig.row;
            var destRow = dataSquareDest.row;

            if( origRow + increment  == destRow && dataSquareDest.piece == null)
                return true;

            if(!self.wasMoved && origRow + (2*increment) == destRow && dataSquareDest.piece == null)
                return true;
        }
 
        return false;
    }

    this.canMoveDiagonal = function(squareOrig, squareDest)
    {
        var dir = this.direction * 1;
        var isRighDiagonal = squareOrig.col == squareDest.col + 1 && squareOrig.row + dir == squareDest.row; 
        var canCapture = squareDest.piece != null && squareDest.piece.isWhite != this.isWhite;
        
        if(isRighDiagonal && canCapture)
            return true;

        var isLeftDiagonal = squareOrig.col = squareDest.col  - 1 && squareOrig.row + dir == squareDest.row;
        
        if(isLeftDiagonal && canCapture)
            return true;

        return false;
    }
    
}

function King(isWhite)
{
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_KING: PIECES.D_KING;
    
    
   /*  this.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        if((Math.abs(origRow - destRow) <= 1) && (Math.abs(origCol - destCol) <= 1))
        {
            return true;
        }

        return false;
    } */
}

function Queen(isWhite)
{
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_QUEEN: PIECES.D_QUEEN;
    
    
    /* this.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        if(Math.abs(origRow - destRow)  == Math.abs(origCol - destCol))
            return true;
        
        if(Math.abs(origRow - destRow) > 0 && Math.abs(origCol - destCol) == 0)
            return true;
            
        if(Math.abs(origCol - destCol) > 0 && Math.abs(origRow - destRow) == 0)
            return true;

        return false;
    } */
}

function Bishop(isWhite)
{
   Piece.call(this, isWhite);
   this.className = (isWhite) ? PIECES.L_BISHOP: PIECES.D_BISHOP;
  /*   
   this.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        if(Math.abs(origRow - destRow)  == Math.abs(origCol - destCol))
            return true;
        return false;
    } */
}
function Knight(isWhite)
{
    Piece.call(this, isWhite);
    this.className = (isWhite) ? PIECES.L_KNIGHT: PIECES.D_KNIGHT;

    /* this.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        if(Math.abs(origCol - destCol) == 2 && Math.abs(origRow - destRow) == 1)
            return true;

        if(Math.abs(origRow - destRow) == 2 && Math.abs(origCol - destCol) == 1)
            return true;

        return false;
    } */
}

function Rook(isWhite)
{
    Piece.call(isWhite);
    this.className = (isWhite) ? PIECES.L_ROOK: PIECES.D_ROOK;
    
   /*  this.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        if(Math.abs(origRow - destRow) > 0 && Math.abs(origCol - destCol) == 0)
            return true;
            
        if(Math.abs(origCol - destCol) > 0 && Math.abs(origRow - destRow) == 0)
            return true;
            
        return false;
    } */
}

function PieceFactory()
{
    this.createDarkBishop = function()
    {
       return new Bishop(false);
    }

    this.createLightBishop = function()
    {
        return new Bishop(true);
    }
    
    this.createDarkRook = function()
    {
        return new Rook(false);
    }

    this.createLightRook = function()
    {
        return new Rook(true);
    }
                                
     this.createDarkKight = function()
    {
        return new Knight(false);
    }      
                                   
    this.createLightKight = function()
    {
       return new Knight(true);
    }    

    this.createDarkQueen = function()
    {
        return new Queen(false);
    }      
                                   
    this.createLightQueen = function()
    {
        return new Queen(true);
    }   
    
    this.createDarkKing = function()
    {
        return new King(false);
    }      
                                   
    this.createLightKing = function()
    {
        return new King(true);
    }   

    this.createDarkPawn = function()
    {
        return new Pawn(false);
    }      
                                   
    this.createLightPawn = function()
    {
        return new Pawn(true);
    }  
}

var PIECES = 
{
    D_BISHOP : "piece-darkbishop",
    L_BISHOP : "piece-lightbishop",

    D_QUEEN : "piece-darkqueen",
    L_QUEEN : "piece-lightqueen",

    D_KNIGHT: "piece-darkknight",
    L_KNIGHT:  "piece-lightknight",

    D_KING : "piece-darkking",
    L_KING : "piece-lightking",

    D_PAWN : "piece-darkpawn",
    L_PAWN : "piece-lightpawn",

    D_ROOK : "piece-darkrook",
    L_ROOK : "piece-lightrook"
}
