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
        let piece = this.board[from.y][from.x];

        this.board[from.y][from.x] = {location: from};
        this.board[to.y][to.x] = {piece: piece.piece, white: piece.white, location: to};

        this.whiteTurn = !this.whiteTurn;
    }
}

module.exports = Game;