const helpers = require('../app/helpers');

module.exports = function (router) {

    router.get('home', () => {
        return helpers.view('pages.home');
    });

    router.get('404', () => {
        return helpers.view('pages.404', 404);
    });
};
