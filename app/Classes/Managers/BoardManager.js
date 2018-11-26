const Piece = require('../Piece');

class BoardManager {

    constructor() {
        this.defaultRow = 'RNBQKBNR';

        this.nameMap = {
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

        for (let y = 0; y < 8; y++) {
            let row = [];

            for (let x = 0; x < 8; x++) {
                let name = null;

                if (y === 0 || y === 7) {
                    name = this.nameMap[this.defaultRow[x]];
                }

                if (y === 1 || y === 6) {
                    name = this.nameMap.P;
                }

                let piece = name ? new Piece(name, y <= 5) : null;
                let location = {x, y};

                row.push({piece, location});
            }

            this.board.push(row);
        }
    }

    getBoard() {
        return this.board;
    }
}

module.exports = BoardManager;