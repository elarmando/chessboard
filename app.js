(function(){

    var chessboard = null;
    var ui = null;

    var init =  function()
    {
        chessboard = new ChessBoard();
        ui = new ChessboardIU(".chessboard", chessboard);
        var factory = new PieceFactory();

        var convertCol = {0 : 'a', 1:'b', 2: 'c', 3:'d', 4:'e', 5:'f', 6:'g', 7:'h'}

        for(var i = 0; i < 8; i++)
        {
            var row = 7;
            var square = convertCol[i] + "" + 7;
            var pwn = factory.createDarkPawn();
            chessboard.addPiece(square, pwn);
        }
        
        chessboard.addPiece("a8", factory.createDarkRook());
        chessboard.addPiece("b8", factory.createDarkKight());
        chessboard.addPiece("c8", factory.createDarkBishop());
        chessboard.addPiece("d8", factory.createDarkQueen());
        chessboard.addPiece("e8", factory.createDarkKing());       
        chessboard.addPiece("f8", factory.createDarkBishop());
        chessboard.addPiece("g8",factory.createDarkKight());
        chessboard.addPiece("h8", factory.createDarkRook());

        for(var i = 0; i < 8; i++)
        {
            var row = 2;
            var square = convertCol[i] + "" + 2;
            var pwn = factory.createLightPawn();
            chessboard.addPiece(square, pwn);
        }

        chessboard.addPiece("a1", factory.createLightRook());
        chessboard.addPiece("b1", factory.createLightKight());
        chessboard.addPiece("c1", factory.createLightBishop());
        chessboard.addPiece("d1", factory.createLightQueen());
        chessboard.addPiece("e1", factory.createLightKing());       
        chessboard.addPiece("f1", factory.createLightBishop());
        chessboard.addPiece("g1",factory.createLightKight());
        chessboard.addPiece("h1", factory.createLightRook());

        ui.draw();
        
        var computer = new Computer(chessboard);
        computer.isWhite = false;
        
        chessboard.onAfterMove = function()
        {
            computer.move();
            ui.draw();
        }
    }
    
    window.onload  = init;
})();