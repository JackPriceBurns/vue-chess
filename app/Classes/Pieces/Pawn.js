class Pawn {
    constructor(piece, board) {
        this.piece = piece;
        this.board = board;
    }

    validMove(from, to) {
        // If they are moving up or down.
        if (from.x = to.x) {
            // They must be moving the pawn.
            return this.handlePawnMove(from, to);
        }

        // If they are moving left or right, they must be attacking.
        if (Math.abs(from.x - to.x) === 1) {
            return this.handlePawnAttack(from, to);
        }

        return false;
    }

    handlePawnMove(from, to) {
        // If you're moving into another piece.
        if (this.board[to.x][to.y].piece) {
            return false;
        }

        let yDiff = to.y - from.y;

        // Is the piece moving in the correct direction.
        if (!this.isCorrectDirection(yDiff)) {
            return false;
        }

        // If the piece has moved one place forward.
        if (Math.abs(yDiff) === 1) {
            return true;
        }

        // If the piece has moved two places and it is it's first move.
        return Math.abs(yDiff) === 2 && this.piece.moves === 0;
    }

    isCorrectDirection(yDiff) {
        // If the piece is white.
        if (this.piece.white) {
            // Return true if they are moving up the board.
            return yDiff > 0;
        }

        // Else, return true if they are moving down the board.
        return yDiff < 0;
    }

    handlePawnAttack(from, to) {
        let yDiff = to.y - from.y;

        // If they are moving up or down greater than one.
        if (Math.abs(yDiff) > 1) {
            // Then they can't possibly be attacking with a pawn.
            return false;
        }

        // If the piece is not moving in the correct direction.
        if (!this.isCorrectDirection(yDiff)) {
            return false;
        }

        let piece = this.board[to.x][to.y].piece;

        // If the pieces colour is the opposite colour to your colour.
        if (piece && piece.white !== this.piece.white) {
            return true;
        }

        // If there is no piece
        if (!piece) {
            // Check if they are doing an en passant
            return this.isEnPassant(from, to);
        }

        return false;
    }

    isEnPassant(from, to) {
        let xDiff = to.x - from.x;

        // todo: finish en passant handling

        // If they are moving left
        if (xDiff > 1) {

        }

        return false;
    }
}

module.exports = Pawn;