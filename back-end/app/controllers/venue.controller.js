const Venue = require('../models/venue.model');

const verifyValidRequestBody = function (requestBody) {
    if (requestBody.hasOwnProperty("venueName") && requestBody.venueName.length < 1) return false;
    if (requestBody.hasOwnProperty("city") && requestBody.city.length < 1) return false;
    if (requestBody.hasOwnProperty("address") && requestBody.address.length < 1) return false;
    if (requestBody.hasOwnProperty("categoryId") && isNaN(requestBody.categoryId)) return false;
    if (requestBody.hasOwnProperty("latitude") && isNaN(requestBody.latitude)) return false;
    if (requestBody.hasOwnProperty("longitude") && isNaN(requestBody.longitude)) return false;
    if (requestBody.hasOwnProperty("longitude") && !checkLongitudeValid(requestBody.longitude)) return false;
    if (requestBody.hasOwnProperty("latitude") && !checkLatitudeValid(requestBody.latitude)) return false;

    return true;
};

const verifyAllValuesIncluded = function (requestBody) {
    if (!requestBody.hasOwnProperty("venueName") || !requestBody.hasOwnProperty("categoryId") ||
        !requestBody.hasOwnProperty("city") || !requestBody.hasOwnProperty("shortDescription") ||
        !requestBody.hasOwnProperty("longDescription") || !requestBody.hasOwnProperty("address") ||
        !requestBody.hasOwnProperty("longitude") || !requestBody.hasOwnProperty("latitude")) return false;
    return true;
};

const checkLatitudeValid = function (latitude) {
    return latitude >= -90 && latitude <= 90;
};

const checkLongitudeValid = function (longitude) {
    return longitude <= 180 && longitude >= -180;
};


exports.read = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };
    if (!req.params.hasOwnProperty("id")) return done(404);
    let id = req.params.id;
    Venue.getOne(id, done);
};

exports.create = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    const allValuesIncluded = verifyAllValuesIncluded(req.body);
    if (!allValuesIncluded) return done(400);

    const requestIsValid = verifyValidRequestBody(req.body);
    if (!requestIsValid) return done(400);

    let venue_data = {
        "venue_name": req.body.venueName,
        "category_id": req.body.categoryId,
        "city": req.body.city,
        "short_description": req.body.shortDescription,
        "long_description": req.body.longDescription,
        "address": req.body.address,
        "longitude": req.body.longitude,
        "latitude": req.body.latitude
    };
    const authToken = req.header("X-Authorization");
    if (!authToken) return done(401);

    Venue.insert(authToken, venue_data, done);
};


exports.update = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    const requestIsValid = verifyValidRequestBody(req.body);
    if (!requestIsValid) return done(400);

    const venueId = req.params.id;
    if (!venueId) return done(400);

    let authToken = req.header("X-Authorization");
    if (!authToken) return done(401);

    if (req.body.length === 0) return done(400);

    Venue.edit(venueId, authToken, req.body, done);
};


exports.listCategories = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };
    Venue.getAllCategories(done);
};

exports.list = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    queryValues = {};

    if (req.query.sortBy && req.query.sortBy.toLowerCase() == "distance") {
        if (!req.query.myLatitude || !req.query.myLongitude) return done(404);
    }

    if (req.query.minStarRating > 5 || req.query.minStarRating < 1) return done(400);
    if (req.query.maxCostRating > 4 || req.query.maxCostRating < 0) return done(400);
    if (req.query.myLatitude && !checkLatitudeValid(req.query.myLatitude)) return done(400);
    if (req.query.myLongitude && !checkLongitudeValid(req.query.myLongitude)) return done(400);


    Venue.getAll(req.query, done);
};

