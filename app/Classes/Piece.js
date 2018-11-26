class Piece {

    /**
     * @param {string} name
     * @param {boolean} white
     */
    constructor (name, white) {
        this.name = name;
        this.white = white;
    }

    /**
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * @returns {boolean}
     */
    isWhite() {
        return this.white;
    }
}

module.exports = Piece;