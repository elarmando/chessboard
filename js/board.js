
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
        
        this.addPiece = function(squareStrings, piece)
        {
            var square = convertSquareString(squareStrings);

            var row =  square.row;
            var col = square.col;
            
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
            

            var pieceOrig = this.squares[fromSquare.row][fromSquare.col];
            var pieceDest = this.squares[toSquare.row][toSquare.col];
            
            if(pieceOrig == null)
                return false;
                
            var dataOrig = new DataSquare(fromSquare.col, fromSquare.row, pieceOrig ? pieceOrig.piece : null);
            var dataDest = new DataSquare(toSquare.col, toSquare.row,pieceDest ? pieceDest.piece: null);
            
            var validMove = pieceOrig.piece.isValidMove(dataOrig, dataDest, this);


            return validMove;
        }
        
        var convertSquareString = function(square)
        {
            var cols = {'a': 0,'b':1, 'c':2, 'd':3, 'e':4, 'f':5, 'g':6, 'h':7
            };
            
            var rows = { '8': 7, '7': 6, '6': 5, '5':4,'4':3,'3':2, '2':1, '1':0
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
    
    function DataSquare(col, row, piece)
    {
        this.col = col;
        this.row = row;
        this.piece = piece;
    }
    
    function Square()
    {
        this.piece = null;
    }
    
 