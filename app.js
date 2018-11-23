const routeManager = new (require('./app/Classes/Managers/RouteManager.js'))();
const helpers = require('./app/helpers');
const http = require('http');
const url = require('url');
const fs = require('fs');

function handlePath(path, request, response) {
    routeManager.handlePath(path, request, response);

    return response.end();
}

let server = http.createServer((request, response) => {
    let path = url.parse(request.url).pathname;

    try {
        if (!fs.lstatSync(path).isFile()) {
            return handlePath(path, request, response);
        }

        response.write(fs.readFileSync(helpers.publicDir(path), 'UTF-8'));

        return response.end();
    } catch (exception) {
        return handlePath(path, request, response);
    }
});

server.listen(8080);
