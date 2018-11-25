const boardManager = new (require('./Managers/BoardManager.js'))();

class Game {

    constructor() {
        this.board = boardManager.getBoard();
        this.whiteTurn = true;
    }

    getBoard() {
        return this.board;
    }

    movePiece(from, to) {
        let piece = this.board[from.x][from.y];

        this.board[from.x][from.y] = null;
        this.board[to.x][to.y] = piece;

        this.whiteTurn = !this.whiteTurn;
    }
}

module.exports = Game;