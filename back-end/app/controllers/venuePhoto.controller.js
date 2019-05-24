const VenuePhoto = require('../models/venuePhoto.model');

exports.create = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    const authToken = req.header("X-Authorization");
    if (!authToken) return done(401);

    VenuePhoto.upload(req.params.id, req.file, req.body["description"], req.body.makePrimary, authToken, done);
};

exports.read = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    const getPhoto = function (code, photoData, photoType) {
        res.status(code);
        res.contentType(photoType);
        res.write(photoData);
        res.end();
    };

    VenuePhoto.getOne(req.params.id, req.params.filename, done, getPhoto);

};

exports.remove = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    authToken = req.header("X-Authorization");
    if (!authToken) return done(401);

    VenuePhoto.delete(req.params.id, authToken, req.params.filename, done);


};

exports.makePrimary = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    authToken = req.header("X-Authorization");
    if (!authToken) return done(401);

    VenuePhoto.setPrimary(req.params.id, req.params.filename, authToken, done);

};
