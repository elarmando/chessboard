
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
        
        this.isValidMove = function(from, to)
        {
            var fromSquare = convertSquareString(from);
            var toSquare = convertSquareString(to);
            
            if(fromSquare == null)
                return false;
            

            var pieceOrig = this.squares[fromSquare.row][fromSquare.col].piece;


            if(pieceOrig == null)
                return false;
            
            var validmove = pieceOrig.isValidMove(fromSquare.row, fromSquare.col, toSquare.row, toSquare.col);

            return validmove;
        }
        
        var convertSquareString = function(square)
        {
            var cols = {'a': 0,'b':1, 'c':2, 'd':3, 'e':4, 'f':5, 'g':6, 'h':7
            };
            
            var rows = { '8': 0, '7': 1, '6': 2, '5':3,'4':4,'3':5, '2':6, '1':7
            }

            if(square.length != 2)
                return null;
            
            var col = cols[square.charAt(0)];
            var row = rows[square.charAt(1)];

            if(col == undefined || row == undefined)
                return null;

            return {col : col, row : row};
        }
        
        this._init();
    }
    
    function Square()
    {
        this.piece = null;
    }
    
    function Piece(iswhite)
    {
        this.className;
        this.isWhite = iswhite;
        
        this.isValidMove = function(origRow, origCol, destRow, destCol)
        {
            return true;
        }
    }
    
  

    function CreateKnight(iswhite)
    {
        var piece = new Piece(iswhite);
        piece.className = (iswhite) ? PIECES.L_KNIGHT: PIECES.D_KNIGHT;

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
            return CreateKnight(false);
        }      
                                       
        this.createLightKight = function()
        {
           return CreateKnight(true);
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
