import PieceFactory from "./PieceFactory";

export default class Position
{
    constructor()
    {

    }

    setupDefault(chessboard)
    {
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

    }

    setupFromFen(fenString, chessboard)
    {
        chessboard.clear();
        var fenSplit = fenString.split(" ");
        var position = fenSplit[0];
        var turn = fenSplit.length > 1 ? fenSplit[1]: undefined;

        var ranks = position.split("/");
        var convertCol = {0 : 'a', 1:'b', 2: 'c', 3:'d', 4:'e', 5:'f', 6:'g', 7:'h'};

        for(let indexRank = 0; indexRank < ranks.length; indexRank++)
        {
            let rank = ranks[7 - indexRank];//fen starts with the last rank
            let col = 0;

            for(let j = 0; j < rank.length && col < 8; j++)
            {
                let char = rank[j];
                let num = parseInt(char);
                let isNumber = !isNaN(num);

                if(isNumber)
                {
                    col+=num;
                }
                else
                {
                    let piece = this._CreatePieceFromLetter(char);
                    let position = convertCol[col] + "" + (indexRank + 1 );

                    chessboard.addPiece(position, piece);
                    
                    col++;
                }
            }
        }

        if(turn != undefined){
            if(turn === 'b')
                chessboard.setBlackTurn();
            else if (true === 'w')
                chessboard.setWhiteTurn();
        }
    }

    _CreatePieceFromLetter(letter)
    {
        var factory = new PieceFactory();
        if(letter == "r")
            return factory.createDarkRook();
        else if(letter == "n")
            return factory.createDarkKight();
        else if(letter == "b")
            return factory.createDarkBishop();
        else if(letter == "q")
            return factory.createDarkQueen();
        else if(letter == "k")
            return factory.createDarkKing();
        else if(letter == "p")
            return factory.createDarkPawn();
        else if(letter == "R")
            return factory.createLightRook();
        else if(letter == "N")
            return factory.createLightKight();
        else if(letter == "B")
            return factory.createLightBishop();
        else if(letter == "Q")
            return factory.createLightQueen();
        else if(letter == "K")
            return factory.createLightKing();
        else if(letter == "P")
            return factory.createLightPawn();

        throw new Error("unrecognize piece letter " + letter);
    }

    _isNumeric(s) {
        return !isNaN(s - parseFloat(s));
    }
}