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

    /**
     * Generate a new board with all the appropriate pieces.
     */
    newBoard() {
        this.board = [];

        for (let y = 0; y < 8; y++) {
            this.board.push(this.generateRow(y));
        }
    }

    /**
     * Generate a single row on the chess board.
     *
     * @param yPos
     * @returns {Array}
     */
    generateRow(yPos) {
        let row = [];

        for (let x = 0; x < 8; x++) {
            let name = null;

            if (yPos === 0 || yPos === 7) {
                name = this.nameMap[this.defaultRow[x]];
            }

            if (yPos === 1 || yPos === 6) {
                name = this.nameMap.P;
            }

            let piece = name ? new Piece(name, yPos <= 5) : null;
            let location = {x, y: yPos};

            row.push({piece, location});
        }

        return row;
    }

    /**
     * Get the currently stored board.
     *
     * @returns {Array}
     */
    getBoard() {
        return this.board;
    }
}

module.exports = BoardManager;