const userPhoto = require('../controllers/userPhoto.controller');

module.exports = function (app) {

    app.route(app.rootUrl + '/users/:id/photo')
        .get(userPhoto.read)
        .put(userPhoto.create)
        .delete(userPhoto.remove);
};