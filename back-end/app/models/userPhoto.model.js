const db = require('../../config/db');
const fs = require('fs');
const photosFilePath = './storage/photos/';

const path = require('path');
const appDir = path.dirname(require.main.filename);



exports.upload = async function (userId, authToken, photoData, photoType, done) {
    const checkValidAuthToken = async function (userId, authToken) {
        let sql = `SELECT user_id FROM User WHERE auth_token = '${authToken}'`;
        const userIdResult = await db.getPool().query(sql);
        if (userIdResult.length === 0) return false;
        return userIdResult[0].user_id == userId;
    };

    const checkUserExists = async function (userId) {
        const userResult = await db.getPool().query(`SELECT * FROM User WHERE user_id = '${userId}'`);
        return userResult.length != 0;
    };

    try {
        const userExists = await checkUserExists(userId);
        if (!userExists) return done(404);
        const validAuthToken = await checkValidAuthToken(userId, authToken);
        if (!validAuthToken) return done(403);

        let filename = userId.toString() + "." + photoType;

        let filepath = photosFilePath + filename;
        fs.writeFile(filepath, photoData, function (err) {
            if (err) return done(404);
        });

        let successStatus;

        const previousPhotoResult = await db.getPool().query(`SELECT profile_photo_filename FROM User WHERE user_id = '${userId}'`);
        if (previousPhotoResult[0].profile_photo_filename != null) {
            successStatus = 200;
        } else {
            successStatus = 201;
        }

        await db.getPool().query(`UPDATE User SET profile_photo_filename = '${filename}' WHERE user_id = '${userId}'`);
        return done(successStatus);
    } catch {
        return done(404);
    }
};




exports.getOne = async function (userId, done, getPhoto) {
    try {
        const sql = `SELECT profile_photo_filename FROM User WHERE user_id = '${userId}'`;
        const result = await db.getPool().query(sql);
        if (result.length === 0) return done(404);
        const photoFilename = result[0].profile_photo_filename;
        const fileType =  photoFilename.substring(photoFilename.lastIndexOf(".") + 1, photoFilename.length);
        const contentHeader = "image/" + fileType;

        fs.readFile('storage/photos/' + photoFilename, function(err, result) {
            if (err) {
                return done(404);
            }
            return getPhoto(200, result, contentHeader);
        });
    } catch (err) {
        return done(404);
    }
};



exports.delete = async function (userId, authToken, done) {
    const checkUserHasPhoto = async function (userId) {
        const sql = `SELECT profile_photo_filename FROM User WHERE user_id = '${userId}'`;
        const result = await db.getPool().query(sql);
        return result[0].profile_photo_filename !== null;
    };

    const checkUserIsValid = async function (userId, authToken) {
        const sql = `SELECT user_id FROM User WHERE auth_token = '${authToken}'`;
        const result = await db.getPool().query(sql);
        if (result.length === 0) return false;
        return (result[0].user_id == userId);
    };

    const checkUserExists = async function (userId) {
        const sql = `SELECT * FROM User WHERE user_id = '${userId}'`;
        const result = await db.getPool().query(sql);
        return result.length !== 0;
    };

    const getContentType = async function (userId) {
        const sql = `SELECT profile_photo_filename FROM User WHERE user_id = '${userId}'`;
        const result = await db.getPool().query(sql);
        if (result.length === 0) return null;
        const filename = result[0].profile_photo_filename;
        return filename.substring(filename.lastIndexOf(".") + 1, filename.length);
    };

    try {
        const userExists = await checkUserExists(userId);
        if (!userExists) return done(404);

        const userHasPhoto = await checkUserHasPhoto(userId);
        if (!userHasPhoto) return done(404);

        const userIsValid = await checkUserIsValid(userId, authToken);
        if (!userIsValid) return done(403);

        const contentType = await getContentType(userId);
        if (!contentType) return done(404);

        const URI = photosFilePath + userId.toString() + "." + contentType;
        fs.unlink(URI, function (err, result) {
            if (err) return done(404);
        });

        const sql = `UPDATE User SET profile_photo_filename = NULL WHERE auth_token = '${authToken}'`;

        await db.getPool().query(sql);
        return done(200);
    } catch (err) {
        return done(404);
    }
};
