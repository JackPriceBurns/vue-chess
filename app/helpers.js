const View = require('./classes/View');
const fs = require('fs');
const _ = require('lodash');

function stripSlashes(string) {
    return string.replace(/^\/|\/$/g, '');
}

function dir(path, prefix = null) {
    path = stripSlashes(path);

    if (prefix) {
        path = prefix + '/' + path;
    }

    return __dirname + '/../' + path;
}

function publicDir(path) {
    return dir(path, 'public');
}

function resourceDir(path) {
    return dir(path, 'resource');
}

function routeDir(path) {
    return dir(path, 'routes');
}

function view(path, code = 200) {
    path = resourceDir('view/' + _.replace(path, '.', '/') + '.view.html');

    let viewData = fs.readFileSync(path, 'UTF-8');

    if (!viewData) {
        throw 'View not found ' + path;
    }

    return new View(viewData, code);
}

module.exports = {
    publicDir: publicDir,
    resourceDir: resourceDir,
    stripSlashes: stripSlashes,
    routeDir: routeDir,
    view: view,
};