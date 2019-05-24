const User = require('../models/user.model');
const bcrypt = require('bcrypt');

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const verifyAllValuesIncluded = function (requestBody) {
    if (!requestBody.hasOwnProperty("username") || !requestBody.hasOwnProperty("givenName") ||
        !requestBody.hasOwnProperty("familyName") || !requestBody.hasOwnProperty("email") ||
        !requestBody.hasOwnProperty("password")) return false;
    return true;
};

const verifyValidRequestBody = function (requestBody) {
    if (requestBody.hasOwnProperty("username") && requestBody.username.length < 1) return false;
    if (requestBody.hasOwnProperty("email") && (requestBody.email.length < 1 || !validateEmail(requestBody.email))) return false;
    if (requestBody.hasOwnProperty("givenName") && requestBody.givenName.length < 1) return false;
    if (requestBody.hasOwnProperty("familyName") && requestBody.familyName.length < 1) return false;
    if (requestBody.hasOwnProperty("password") && requestBody.password.length < 1) return false;
    return true;
};

exports.create = function (req, res) {
    const hashPassword = function(user_data) {
        let password = user_data["password"];
        let hashedPassword = bcrypt.hashSync(password, 10);
        user_data["password"] = hashedPassword;
    };

    const done = function (code, value) {
        res.status(code).json(value);
    };

    const allValuesIncluded = verifyAllValuesIncluded(req.body);
    if (!allValuesIncluded) return done(400);
    const requestIsValid = verifyValidRequestBody(req.body);
    if (!requestIsValid) return done(400);

    let user_data = {
        "username": req.body.username,
        "email": req.body.email,
        "given_name": req.body.givenName,
        "family_name": req.body.familyName,
        "password": req.body.password
    };

    hashPassword(user_data);
    User.insert(user_data, done);
};

exports.read = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };
    let user_id = req.params.id;
    let auth_token = req.header("X-Authorization");
    User.getOne(user_id, auth_token, done);
};

exports.update = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };
    let auth_token = req.header("X-Authorization");
    if (!auth_token) return done(401);

    const requestIsValid = verifyValidRequestBody(req.body);
    if (!requestIsValid) return done(400);

    let user_id = req.params.id;
    let user_data = req.body;
    for (key in user_data) {
        if (typeof user_data[key] == "number") return done(400);
    }
    User.edit(user_data, user_id, auth_token, done);
};

exports.login = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    let user_data = {
        "username": req.body.username,
        "email": req.body.email,
        "password": req.body.password
    };
    let field;
    let identifier;
    if (req.body.username) {
        field = "username";
        identifier = user_data["username"];
    } else if (req.body.email) {
        field = "email";
        identifier = user_data["email"];
    } else {
        return done(400);
    };
    User.login(field, identifier, user_data["password"], done);
};

exports.logout = function (req, res) {
    const done = function (code, value) {
        res.status(code).json(value);
    };

    let authToken = req.header("X-Authorization");

    User.logout(authToken, done);
};

