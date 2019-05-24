const Review = require('../models/review.model');

exports.readVenueReviews = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };
    let id = req.params.id;
    Review.getAllVenue(id, done);

};

exports.readUserReviews = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };
    let id = req.params.id;

    let authToken = req.header("X-Authorization");
    if (!authToken) return done(401);

    Review.getAllUser(id, authToken, done);
};


exports.create = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    let venueId = req.params.id;
    if (!venueId) return done(400);

    let authToken = req.header("X-Authorization");
    if (!authToken) return done(401);

    if (!req.body.hasOwnProperty("reviewBody") || !req.body.hasOwnProperty("starRating") ||
        !req.body.hasOwnProperty("costRating")) {
        return done(400);
    }

    let reviewData = {};
    reviewData.review_body = req.body.reviewBody;
    reviewData.star_rating = req.body.starRating;
    reviewData.cost_rating = req.body.costRating;
    reviewData.reviewed_venue_id = venueId;

    if (reviewData.star_rating > 5) return done(400);
    if (reviewData.star_rating % 1 != 0 || reviewData.cost_rating % 1 != 0) return done(400);
    if (reviewData.cost_rating < 0) return done(400);

    Review.insert(reviewData, authToken, done);
};