function Piece(iswhite)
{
    this.className;
    this.isWhite = iswhite;
    this.wasMoved = false;
    
    this.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        return true;
    }

}

function CreatePawn(isWhite)
{
    var piece = new Piece(isWhite);
    var self = piece;
    piece.className = (isWhite) ? PIECES.L_PAWN: PIECES.D_PAWN;
    
    
    piece.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        if(origCol == destCol)
        {
            var increment = self.isWhite ? -1: 1;

            if( origRow + increment  == destRow)
                return true;

            if(!self.wasMoved && origRow + (2*increment) == destRow)
                return true;
        }
        
        return false;
    }

    return piece;
}

function CreateKing(isWhite)
{
    var piece = new Piece(isWhite);
    piece.className = (isWhite) ? PIECES.L_KING: PIECES.D_KING;
    
    
    piece.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        if((Math.abs(origRow - destRow) <= 1) && (Math.abs(origCol - destCol) <= 1))
        {
            return true;
        }

        return false;
    }
    
    return piece;
}

function CreateQueen(isWhite)
{
    var piece = new Piece(isWhite);
    piece.className = (isWhite) ? PIECES.L_QUEEN: PIECES.D_QUEEN;
    
    
    piece.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        if(Math.abs(origRow - destRow)  == Math.abs(origCol - destCol))
            return true;
        
        if(Math.abs(origRow - destRow) > 0 && Math.abs(origCol - destCol) == 0)
            return true;
            
        if(Math.abs(origCol - destCol) > 0 && Math.abs(origRow - destRow) == 0)
            return true;

        return false;
    }
    
    return piece;
}

function CreateBishop(isWhite)
{
    var piece = new Piece(isWhite);
    piece.className = (isWhite) ? PIECES.L_BISHOP: PIECES.D_BISHOP;
    
    piece.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        if(Math.abs(origRow - destRow)  == Math.abs(origCol - destCol))
            return true;
        return false;
    }
    
    return piece;
}

function CreateKnight(isWhite)
{
    var piece = new Piece(isWhite);
    piece.className = (isWhite) ? PIECES.L_KNIGHT: PIECES.D_KNIGHT;

    piece.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        debugger;
        if(Math.abs(origCol - destCol) == 2 && Math.abs(origRow - destRow) == 1)
            return true;

        if(Math.abs(origRow - destRow) == 2 && Math.abs(origCol - destCol == 1))
            return true;

        return false;
    }
    
    return piece;
}

function CreateRook(isWhite)
{
    var piece = new Piece(isWhite);
    piece.className = (isWhite) ? PIECES.L_ROOK: PIECES.D_ROOK;
    
    piece.isValidMove = function(origRow, origCol, destRow, destCol)
    {
        if(Math.abs(origRow - destRow) > 0 && Math.abs(origCol - destCol) == 0)
            return true;
            
        if(Math.abs(origCol - destCol) > 0 && Math.abs(origRow - destRow) == 0)
            return true;
            
        return false;
    }
    
    return piece;
}


function PieceFactory()
{
    this.createDarkBishop = function()
    {
       return CreateBishop(false);
    }

    this.createLightBishop = function()
    {
        return CreateBishop(true);
    }
    
    this.createDarkRook = function()
    {
        return CreateRook(false);
    }

    this.createLightRook = function()
    {
        return CreateRook(true);
    }
                                
     this.createDarkKight = function()
    {
        return CreateKnight(false);
    }      
                                   
    this.createLightKight = function()
    {
       return CreateKnight(true);
    }    

    this.createDarkQueen = function()
    {
        return CreateQueen(false);
    }      
                                   
    this.createLightQueen = function()
    {
        return CreateQueen(true);
    }   
    
    this.createDarkKing = function()
    {
        return CreateKing(false);
    }      
                                   
    this.createLightKing = function()
    {
        return CreateKing(true);
    }   

    this.createDarkPawn = function()
    {
        return CreatePawn(false);
    }      
                                   
    this.createLightPawn = function()
    {
        return CreatePawn(true);
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
