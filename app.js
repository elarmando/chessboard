(function(){

    var chessboard = null;
    var ui = null;

    var init =  function()
    {
        chessboard = new ChessBoard();
        ui = new ChessboardIU(".chessboard", chessboard);
        var factory = new PieceFactory();

        for(var i = 0; i < 8; i++)
        {
            var pwn = factory.createDarkPawn();
            chessboard.addPiece(1,i, pwn);
        }
        
        chessboard.addPiece(0,0, factory.createDarkRook());
        chessboard.addPiece(0,1, factory.createDarkKight());
        chessboard.addPiece(0,2, factory.createDarkBishop());
        chessboard.addPiece(0,3, factory.createDarkQueen());
        chessboard.addPiece(0,4, factory.createDarkKing());
        chessboard.addPiece(0,5, factory.createDarkBishop());
        chessboard.addPiece(0,6,factory.createDarkKight());
        chessboard.addPiece(0, 7, factory.createDarkRook());

        for(var i = 0; i < 8; i++)
        {
            var pwn = factory.createLightPawn();
            chessboard.addPiece(6,i, pwn);
        }
        
       chessboard.addPiece(7,0, factory.createLightRook());
        chessboard.addPiece(7,1, factory.createLightKight());
        chessboard.addPiece(7,2, factory.createLightBishop());
        chessboard.addPiece(7,3, factory.createLightQueen());
        chessboard.addPiece(7,4, factory.createLightKing());
        chessboard.addPiece(7,5, factory.createLightBishop());
        chessboard.addPiece(7,6,factory.createLightKight());
        chessboard.addPiece(7, 7, factory.createLightRook());

        ui.draw();
        
      
    
    }
    
    window.onload  = init;
})();