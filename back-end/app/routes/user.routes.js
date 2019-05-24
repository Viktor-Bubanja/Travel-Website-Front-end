const user = require('../controllers/user.controller');

module.exports = function (app) {

    app.route(app.rootUrl + '/users')
        .post(user.create);

    app.route(app.rootUrl + '/users/:id/reviews')
        .get();

    app.route(app.rootUrl + '/users/login')
        .post(user.login);

    app.route(app.rootUrl + '/users/logout')
        .post(user.logout);

    app.route(app.rootUrl + '/users/:id')
        .get(user.read)
        .patch(user.update);

    app.route(app.rootUrl + '/users/:id/photo')
        .get()
        .put()
        .delete();
};