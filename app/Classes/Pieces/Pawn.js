class Pawn {
    constructor(piece, board) {
        this.piece = piece;
        this.board = board;
    }

    validMove(from, to) {
        // If they are moving up or down.
        if (from.x === to.x) {
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
        if (this.board[to.y][to.x].piece) {
            return false;
        }

        let yDiff = to.y - from.y;

        // Is the piece moving in the correct direction.
        if (!this.isCorrectDirection(yDiff)) {
            return false;
        }

        // If the piece has moved one place forward.
        if (Math.abs(yDiff) === 1) {
            this.handlePromotion(from, to);

            this.piece.moves++;

            return true;
        }

        // If the piece has moved two places and it is it's first move.
        if (Math.abs(yDiff) === 2 && this.piece.moves === 0) {
            return this.handleDoubleMove(from, to);
        }

        return false;
    }

    handleDoubleMove(from, to) {
        let middlePiece = this.board[(from.y + to.y)/2][to.x].piece;

        if (middlePiece) {
            return false;
        }

        this.piece.moves++;

        return true;
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

        let defendingPiece = this.board[to.y][to.x].piece;

        // If there is no piece
        if (!defendingPiece) {
            // Check if they are doing an en passant
            return this.isEnPassant(from, to);
        }

        // If the pieces colour is the opposite colour to your colour.
        if (defendingPiece.white !== this.piece.white) {
            this.handlePromotion(from, to);

            this.piece.moves++;

            return true;
        }

        return false;
    }

    isEnPassant(from, to) {
        // En passant can only happen on ranks 3 and 6
        if (to.y !== 2 && to.y !== 5) {
            return false;
        }

        let defendingPosition = this.enPassantDefendingPiece(from, to);

        let defendingPiece = defendingPosition.piece;

        // If there is no defending piece... then there is no attack
        if (!defendingPiece) {
            return false;
        }

        // If the piece isn't a pawn... you can't en passant anything else.
        if (defendingPiece.name !== 'pawn') {
            return false;
        }

        // If the colours are the same... you can't attack your own pieces.
        if (defendingPiece.white === this.piece.white) {
            return false;
        }

        // If the piece doesn't have one move... it can't have double moved.
        if (defendingPiece.moves !== 1) {
            return false;
        }

        // If the piece was the last piece to move.
        if (defendingPiece.recentlyMoved) {
            let location = defendingPosition.location;

            // Remove the defending piece.
            this.board[location.y][location.x].piece = null;

            this.piece.moves++;

            return true;
        }

        return false;
    }

    enPassantDefendingPiece(from, to) {
        let xDiff = to.x - from.x;

        // If they are moving left
        if (xDiff > 0) {
            return this.board[from.y][from.x + 1];
        }

        return this.board[from.y][from.x - 1];
    }

    handlePromotion(from, to) {
        if (to.y !== 0 && to.y !== 7) {
            return false;
        }

        this.board[from.y][from.x].piece.name = 'queen';

        return true;
    }
}

module.exports = Pawn;