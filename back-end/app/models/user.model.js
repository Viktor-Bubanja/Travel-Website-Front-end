const db = require('../../config/db');
const uuid = require('uuidv4');
const bcrypt = require('bcrypt');


//POST /users
exports.insert = async function(user, done) {
    let username = user.username;
    let email = user.email;
    let given_name = user.given_name;
    let family_name = user.family_name;
    let password = user.password;
    try {
        let sql = `INSERT INTO User (username, email, given_name, family_name, password) VALUES ('${username}', '${email}', '${given_name}', '${family_name}', '${password}')`;
        await db.getPool().query(sql);
        const user_id_result = await db.getPool().query(`SELECT user_id FROM User WHERE username = '${username}'`);
        return done(201, {"userId": user_id_result[0].user_id});
    } catch {
        return done(400);
    }
};

//GET /users/{id}
exports.getOne = async function (id, auth_token, done) {
    try {

        const auth_token_result = await db.getPool().query(`SELECT auth_token FROM User WHERE user_id = '${id}'`);
        let result;
        let output;

        if (auth_token_result[0].auth_token === auth_token && auth_token != null) {
            result = await db.getPool().query(`SELECT username, email, given_name, family_name FROM User WHERE user_id = '${id}'`);
            output = {
                "username": result[0].username,
                "email": result[0].email,
                "givenName": result[0].given_name,
                "familyName": result[0].family_name
            }
        } else {
            result = await db.getPool().query(`SELECT username, given_name, family_name FROM User WHERE user_id = '${id}'`);
            output = {
                "username": result[0].username,
                "givenName": result[0].given_name,
                "familyName": result[0].family_name
            }
        }
        if (!result[0]) {
            return done(404);
        }
        return done(200, output);
    } catch {
        return done(404);
    }
};


//PATCH /users/{id}
exports.edit = async function (user_data, user_id, auth_token, done) {
    try {
        let sql = `SELECT auth_token FROM User WHERE user_id = '${user_id}'`;
        const token_result = await db.getPool().query(sql);
        if (token_result[0].auth_token !== auth_token) return done(403);
        let values = {};

        if (user_data.hasOwnProperty("givenName")) values.given_name = user_data.givenName;
        if (user_data.hasOwnProperty("familyName")) values.family_name = user_data.familyName;
        if (user_data.hasOwnProperty("password")) values.password = user_data.password;

        await db.getPool().query("UPDATE User SET ? WHERE user_id = ?", [values, user_id]);
        return done(200);
    } catch {
        return done(400);
    }
};


//POST /users/login
exports.login = async function (field, value, password, done) {
    try {
        const result = await db.getPool().query(`SELECT * FROM User WHERE ${field} = '${value}'`);
        let hashedPassword = result[0].password;
        let userId = result[0].user_id;
        if (await bcrypt.compare(password, hashedPassword)) {
            const token = uuid().toString().slice(0, 32);
            let updateQuery = `UPDATE User SET auth_token = '${token}' WHERE user_id = '${userId}'`;
            db.getPool().query(updateQuery);
            return done(200, {
                    "userId": userId,
                    "token": token
                }
            );
        } else {
            return done(400);
        }
    } catch {
        return done(400);
    }
};


exports.logout = async function (authToken, done) {
    try {
        let selectQuery = `SELECT * from User where auth_token = '${authToken}'`;
        const resultId = await db.getPool().query(selectQuery);
        let userId = resultId[0].user_id;
        if (!userId) {
            return done(401);
        }
        let updateQuery = `UPDATE User SET auth_token = NULL WHERE user_id = '${userId}'`;
        const result = await db.getPool().query(updateQuery);
        return done(200);
    } catch {
        return done(401);
    }
};
