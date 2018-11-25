const helpers = require('../../helpers');
const Router = require('../Router');
const _ = require('lodash');

class RouteManager {

    constructor() {
        this.allRoutes = {
            GET: [],
            POST: [],
        };

        this.registerRoutes();
    }

    getRouter() {
        return new Router(this);
    }

    registerRoutes() {
        require(helpers.routeDir('routes'))(this.getRouter());
    }

    handlePath(path, request, response) {
        path = helpers.stripSlashes(path);

        let route = this.findRoute(request.method, path);

        if (route) {
            return this.handleRoute(route, request, response);
        }

        return this.handleRoute(this.findRoute('GET', '404'), request, response);
    }

    findRoute(method, path) {
        return _.find(this.getRoutes(method), {'path': path});
    }

    getRoutes(method) {
        return this.allRoutes[method];
    }

    handleRoute(route, request, response) {
        if (typeof route.method === 'function') {
            this.handleRouteClosure(route.method(request, response), response);
        }

        if (route.method instanceof String) {
            // Find the controller and call the appropriate method
        }
    }

    handleRouteClosure(data, response) {
        response.code = data.getCode();

        return response.write(data.render());
    }
}

module.exports = RouteManager;
