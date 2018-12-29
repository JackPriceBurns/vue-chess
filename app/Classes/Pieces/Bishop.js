class Bishop {
    constructor(piece, board) {
        this.piece = piece;
        this.board = board;
    }

    validMove(from, to) {
        let yDiff = to.y - from.y;
        let xDiff = to.x - from.x;

        if (yDiff === 0 || xDiff === 0) {
            return false;
        }

        if (Math.abs(yDiff) !== Math.abs(xDiff)) {
            return false;
        }

        if (this.travelsThroughPiece(from, to)) {
            return false;
        }

        let defendingPiece = this.getDefendingPiece(to);

        if (!defendingPiece) {
            return true;
        }

        return defendingPiece.white !== this.piece.white;
    }

    travelsThroughPiece(from, to) {
        let xDiff = to.x - from.x;

        for (let x = 0; x < xDiff; x++) {
            let xPos = (x + Math.abs(xDiff));

            // Finish working out bishop movement.
        }

        return false;
    }

    getDefendingPiece(to) {
        return this.board[to.y][to.x].piece;
    }
}

module.exports = Bishop;