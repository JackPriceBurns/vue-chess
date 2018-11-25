const uuid = require('uuid/v4');
const Game = require('../Game');
const _ = require('lodash');

class GameManager {

    constructor() {
        this.games  = [];
    }

    /**
     * @param gameId
     *
     * @returns {id, game}
     */
    getGame(gameId) {
        let gameStore = _.find(this.games, ['id', gameId]);

        if (gameStore) {
            return gameStore;
        }

        return null;
    }

    startGame() {
        let id = this.generateId();
        let game = this.generateGame();

        this.games.push({id: id, game: game});

        return id;
    }

    generateId() {
        return uuid();
    }

    generateGame() {
        return new Game();
    }
}

module.exports = GameManager;