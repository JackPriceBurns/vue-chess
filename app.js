const routeManager = new (require('./app/Classes/Managers/RouteManager.js'))();
const gameManager = new (require('./app/Classes/Managers/GameManager.js'))();
const helpers = require('./app/helpers');
const mime = require('mime-types');
const http = require('http');
const url = require('url');
const fs = require('fs');
const _ = require('lodash');

function handlePath(path, request, response) {
    routeManager.handlePath(path, request, response);

    return response.end();
}

function calculateMimeType(path) {
    return mime.contentType(_.last(path.split('/')));
}

let server = http.createServer((request, response) => {
    let path = url.parse(request.url).pathname;

    try {
        if (!fs.lstatSync(helpers.publicDir(path)).isFile()) {
            return handlePath(path, request, response);
        }

        response.writeHead(200, {'content-type': calculateMimeType(path)});
        response.write(fs.readFileSync(helpers.publicDir(path), 'UTF-8'));

        return response.end();
    } catch (exception) {
        return handlePath(path, request, response);
    }
});

server.listen(4000);

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
    })
});
