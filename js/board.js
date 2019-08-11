
    function ChessBoard()
    {
        this.squares = [];
        
        this._init = function()
        {
            this._createBoard();
        }

        this._createBoard = function()
        {
            this.squares = [];
            
            for(var i = 0; i < 8; i++)
            {
                var row = [];
                this.squares.push(row);
                
                for(var j = 0; j < 8; j++)
                {
                    row.push(new Square());
                }
            }
        }
        
        this.addPiece = function(row, col, piece)
        {
           if(row > 8 || row < 0) 
                return;

            if(col > 8 || col < 0)
                return; 
            
            var square = this.squares[row][col];

            if(piece)
                square.piece = piece;
        }           
        
        this._init();
    }
    
    function Square()
    {
        this.piece = null;
    }
    
    function Piece()
    {
        this.className;
    }

    function PieceFactory()
    {
        this.createDarkBishop = function()
        {
            var piece = new Piece();
            piece.className = PIECES.D_BISHOP;
            return piece;
        }

        this.createLightBishop = function()
        {
            var piece = new Piece();
            piece.className = PIECES.L_BISHOP;
            return piece;
        }
        
        this.createDarkRook = function()
        {
            var piece = new Piece();
            piece.className = PIECES.D_ROOK;
            return piece;
        }

        this.createLightRook = function()
        {
            var piece = new Piece();
            piece.className = PIECES.L_ROOK
            return piece;
        }
                                    
         this.createDarkKight = function()
        {
            var piece = new Piece();
            piece.className = PIECES.D_KNIGHT;
            return piece;
        }      
                                       
        this.createLightKight = function()
        {
            var piece = new Piece();
            piece.className = PIECES.L_KNIGHT;
            return piece;
        }    

        this.createDarkQueen = function()
        {
            var piece = new Piece();
            piece.className = PIECES.D_QUEEN;
            return piece;
        }      
                                       
        this.createLightQueen = function()
        {
            var piece = new Piece();
            piece.className = PIECES.L_QUEEN;
            return piece;
        }   
        
        this.createDarkKing = function()
        {
            var piece = new Piece();
            piece.className = PIECES.D_KING;
            return piece;
        }      
                                       
        this.createLightKing = function()
        {
            var piece = new Piece();
            piece.className = PIECES.L_KING;
            return piece;
        }   

        this.createDarkPawn = function()
        {
            var piece = new Piece();
            piece.className = PIECES.D_PAWN;
            return piece;
        }      
                                       
        this.createLightPawn = function()
        {
            var piece = new Piece();
            piece.className = PIECES.L_PAWN;
            return piece;
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
