class Piece {
    /**
     * @param {string} name
     * @param {boolean} white
     */
    constructor (name, white) {
        this.name = name;
        this.white = white;
        this.moves = 0;
    }
}

module.exports = Piece;