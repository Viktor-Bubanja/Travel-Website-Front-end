const UserPhoto = require('../models/userPhoto.model');


exports.create = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    if (req.header("Content-Type") === "image/png") {
        res.contentType("image/png");
    } else {
        res.contentType("image/jpeg");
    }

    userId = req.params.id;
    authToken = req.header("X-Authorization");
    if (!authToken) return done(401);

    let photoType;
    if (req.header("Content-Type") === "image/png") {
        photoType = "png";
    } else {
        photoType = "jpeg";
    }

    UserPhoto.upload(userId, authToken, req.body, photoType, done);
};


exports.read = function (req, res) {
    const done = function (code, value, photoType) {
        res.status(code).send();
    };

    const getPhoto = function (code, photoData, photoType) {
        res.status(code);
        res.contentType(photoType);
        res.write(photoData);
        res.end();
    };

    userId = req.params.id;
    UserPhoto.getOne(userId, done, getPhoto);
};



exports.remove = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    authToken = req.header("X-Authorization");
    if (!authToken) return done(401);

    userId = req.params.id;

    UserPhoto.delete(userId, authToken, done);
};



