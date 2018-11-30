const boardManager = new (require('./Managers/BoardManager.js'))();

const Pawn = require('./Pieces/Pawn');
const King = require('./Pieces/King');
const Knight = require('./Pieces/Knight');
const Queen = require('./Pieces/Queen');
const Bishop = require('./Pieces/Bishop');
const Rook = require('./Pieces/Rook');

class Game {

    constructor() {
        this.board = boardManager.getBoard();
        this.whiteTurn = true;

        this.classMap = {
            rook: Rook,
            knight: Knight,
            bishop: Bishop,
            queen: Queen,
            king: King,
            pawn: Pawn,
        };
    }

    getBoard() {
        return this.board;
    }

    movePiece(from, to) {
        let tile = this.board[from.y][from.x];
        let piece = tile.piece;

        if (piece.white !== this.whiteTurn) {
            return;
        }

        let pieceClass = this.getPieceClass(piece);

        console.debug(pieceClass);

        if ((typeof pieceClass.validMove) !== 'function') {
            return;
        }

        if (pieceClass.validMove(from, to)) {
            this.board[from.y][from.x] = {location: from};
            this.board[to.y][to.x] = {piece: tile.piece, location: to};

            this.whiteTurn = !this.whiteTurn;
        }
    }

    getPieceClass(piece) {
        let pieceClass;

        if (!(pieceClass = this.classMap[piece.name])) {
            return null;
        }

        return pieceClass;
    }
}

module.exports = Game;