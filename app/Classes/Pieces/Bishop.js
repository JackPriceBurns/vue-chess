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

    /**
     * Checks if the line between from and to lies on any pieces.
     *
     * @param from
     * @param to
     * @returns {boolean}
     */
    travelsThroughPiece(from, to) {
        let xDiff = to.x - from.x;
        let yDiff = to.y - from.y;

        // If the bishop is only moving one space, it can't be going through a piece.
        if (Math.abs(xDiff) === 1) {
            return false;
        }

        let piecesToCheck = Math.abs(xDiff);

        for (let x = 1; x < piecesToCheck; x++) {
            let offendingPos = this.getOffendingPos(xDiff, yDiff, from, x);

            // If there isn't a piece in that position check next position.
            if (!offendingPos.piece) {
                continue;
            }

            return true;
        }

        return false;
    }

    /**
     * Given that you have a from and a difference in x and y calculate
     * the next piece in line x.
     *
     * @param xDiff
     * @param yDiff
     * @param from
     * @param x
     * @returns {*}
     */
    getOffendingPos(xDiff, yDiff, from, x) {
        let offendingX, offendingY;

        offendingX = xDiff > 0 ? from.x + x : from.x - x;
        offendingY = yDiff > 0 ? from.y + x : from.y - x;

        return this.board[offendingY][offendingX];
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

module.exports = Bishop;