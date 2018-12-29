class Knight {
    constructor(piece, board) {
        this.piece = piece;
        this.board = board;
    }

    validMove(from, to) {
        let yDiff = Math.abs(to.y - from.y);
        let xDiff = Math.abs(to.x - from.x);

        if (!Knight.isValid(yDiff, xDiff)) {
            return false;
        }

        let defendingPiece = this.getDefendingPiece(to);

        if (!defendingPiece) {
            return true;
        }

        return defendingPiece.white !== this.piece.white;
    }

    /**
     * Given the displacement in x and y check if this is valid knight movement.
     *
     * @param yDiff
     * @param xDiff
     * @returns {boolean}
     */
    static isValid(yDiff, xDiff) {
        if (yDiff === 1 && xDiff === 2) {
            return true;
        }

        return yDiff === 2 && xDiff === 1;
    }

    /**
     * Given that you have a location get the piece at that location.
     *
     * @param to
     * @returns {*|null}
     */
    getDefendingPiece(to) {
        return this.board[to.y][to.x].piece;
    }
}

module.exports = Knight;