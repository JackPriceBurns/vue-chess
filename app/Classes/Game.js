const boardManager = new (require('./Managers/BoardManager.js'))();
const _ = require('lodash');

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

    /**
     * Move a piece on the board from and to the specified locations
     *
     * @param {object} to
     * @param {number} to.x
     * @param {number} to.y
     * @param {object} from
     * @param {number} from.x
     * @param {number} from.y
     */
    movePiece(from, to) {
        let tile = this.board[from.y][from.x];
        let piece = tile.piece;

        if (piece.white !== this.whiteTurn) {
            return;
        }

        let pieceClass = this.getPieceClass(piece);

        if ((typeof pieceClass.validMove) !== 'function') {
            return;
        }

        if (pieceClass.validMove(from, to)) {
            this.resetRecentlyMoved();

            tile.piece.recentlyMoved = true;

            this.board[from.y][from.x] = {location: from};
            this.board[to.y][to.x] = {piece: tile.piece, location: to};

            this.whiteTurn = !this.whiteTurn;
        }
    }

    /**
     * Get the related javascript object for the piece given.
     *
     * @param piece
     * @returns {*}
     */
    getPieceClass(piece) {
        let pieceClass;

        if (!(pieceClass = this.classMap[piece.name])) {
            return null;
        }

        return new pieceClass(piece, this.getBoard());
    }

    /**
     * Set recentlyMoved on all pieces on the board to false.
     */
    resetRecentlyMoved() {
        _.each(this.board, rank => {
            _.each(rank, position => {
                if (!position.piece) {
                    return;
                }

                position.piece.recentlyMoved = false;
            });
        });
    }
}

module.exports = Game;