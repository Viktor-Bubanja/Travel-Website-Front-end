const review = require('../controllers/review.controller');

module.exports = function (app) {

    app.route(app.rootUrl + '/venues/:id/reviews')
        .get(review.readVenueReviews)
        .post(review.create);

    app.route(app.rootUrl + '/users/:id/reviews')
        .get(review.readUserReviews);
};