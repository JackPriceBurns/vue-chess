const helpers = require('../helpers');

class Router {
    constructor(routeManager) {
        this.routeManager = routeManager;
    }

    get(path, closure) {
        this.addRoute('GET', path, closure);
    }

    post(path, closure) {
        this.addRoute('POST', path, closure);
    }

    addRoute(method, path, closure) {
        path = helpers.stripSlashes(path);

        this.routeManager.allRoutes[method].push({path: path, method: closure});
    }
}

module.exports = Router;
