const gameManager = new (require('./app/Classes/Managers/GameManager.js'))();
const http = require('http');

let server = http.createServer(() => {}).listen(4000);

const io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
    socket.on('start-game', () => {
        let gameId = gameManager.startGame();

        socket.emit('game-started', {gameId});
    });

    socket.on('join-game', data => {
        if (!data.gameId) {
            return;
        }

        let game = gameManager.getGame(data.gameId);

        if (!game) {
            socket.emit('game-not-found', 'The requested game was not found!');

            return;
        }

        socket.join('game-' + game.id);

        io.to('game-' + game.id).emit('load-board', {board: game.game.getBoard()});
    });

    socket.on('move-piece', data => {
        if (!data.gameId) {
            return;
        }

        let game = gameManager.getGame(data.gameId);

        if (!game) {
            socket.emit('game-not-found', 'The requested game was not found!');

            return;
        }

        game.game.movePiece(data.from, data.to);

        io.to('game-' + game.id).emit('load-board', {board: game.game.getBoard()});
    });
});
