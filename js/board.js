
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
        
        this.move = function(from, to)
        {
            var fromSquare = convertSquareString(from);
            var toSquare = convertSquareString(to);
            
            if(fromSquare == null && toSquare != null)
                return;

            var piece = this.squares[fromSquare.row][fromSquare.col];

            if(piece != null)
            {
                piece.wasMoved = true;
                this.squares[toSquare.row][toSquare.col] = piece;
            }
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
    
 