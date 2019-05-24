const venue = require('../controllers/venue.controller');

module.exports = function (app) {

    app.route(app.rootUrl + '/venues')
        .post(venue.create)
        .get(venue.list);


    app.route(app.rootUrl + '/venues/:id')
        .get(venue.read)
        .patch(venue.update);


//photos

    app.route(app.rootUrl + '/venues/:id/photos')
        .post();

    app.route(app.rootUrl + '/venues/:id/photos/:photoFilename')
        .get()
        .delete();

    app.route(app.rootUrl + '/venues/:id/photos/:photoFilename/setPrimary')
        .post();

//reviews

    app.route(app.rootUrl + '/venues/:id/reviews')
        .get()
        .post();


//categories

    app.route(app.rootUrl + '/categories')
        .get(venue.listCategories);
};