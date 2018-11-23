const view = require('../app/helpers').view;

module.exports = function (router) {

    router.get('/', () => {
        return view('pages.home');
    });

    router.get('404', () => {
        return view('pages.404', 404);
    });
};
