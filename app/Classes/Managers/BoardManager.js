class BoardManager {

    constructor() {
        this.defaultRow = 'RNBQKBNR';

        this.pieceMap = {
            R: 'rook',
            N: 'knight',
            B: 'bishop',
            Q: 'queen',
            K: 'king',
            P: 'pawn',
        };

        this.newBoard();
    }

    newBoard() {
        this.board = [];

        for (let x = 0; x < 8; x++) {
            let row = [];

            for (let y = 0; y < 8; y++) {
                let piece = null;
                let white = false;

                if (y === 0 || y === 7) {
                    piece = this.pieceMap[this.defaultRow[x]];
                }

                if (y === 1 || y === 6) {
                    piece = this.pieceMap.P;
                }

                if (y >= 6) {
                    white = true
                }

                row.push(piece ? {piece: piece, white: white} : null);
            }

            this.board.push(row);
        }
    }

    getBoard() {
        return this.board;
    }
}

module.exports = BoardManager;