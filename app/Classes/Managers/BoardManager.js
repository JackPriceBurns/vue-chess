class BoardManager {

    constructor() {
        this.newBoard();
    }

    newBoard() {
        this.board = [];

        for (let x = 0; x < 8; x++) {
            let row = [];

            for (let y = 0; y < 8; y++) {
                row.push({piece: 'bishop', white: true});
            }

            this.board.push(row);
        }
    }

    getBoard() {
        return this.board;
    }
}

module.exports = BoardManager;