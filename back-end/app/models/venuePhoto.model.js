const db = require('../../config/db');
const fs = require('fs');
const multer = require('multer');
const photosFilePath = './storage/photos/';


const checkVenueExists = async function (venueId) {
    const venueIdResult = await db.getPool().query(`SELECT * FROM Venue WHERE venue_id = '${venueId}'`);
    return venueIdResult.length !== 0;
};

const checkAuthTokenIsValid = async function (authToken) {
    const authTokenResult = await db.getPool().query(`SELECT * FROM User WHERE auth_token = '${authToken}'`);
    return authTokenResult.length !== 0;
};

const checkUserAuthorized = async function(venueId, authToken) {
    const adminIdResult = await db.getPool().query(`SELECT admin_id FROM Venue WHERE venue_id = '${venueId}'`);
    const adminId = adminIdResult[0].admin_id;
    const userResult = await db.getPool().query(`SELECT user_id FROM User WHERE auth_token = '${authToken}'`);
    return adminId == userResult[0].user_id;
};


exports.upload = async function(venueId, photo, description, makePrimary, authToken, done) {
    const checkVenueHasPrimaryPhoto = async function(venueId) {
        const venuePhotoResult = await db.getPool().query(`SELECT * FROM VenuePhoto WHERE venue_id = '${venueId}' AND is_primary = '1'`);
        return venuePhotoResult.length != 0;
    };

    try {
        const authTokenIsValid = await checkAuthTokenIsValid(authToken);
        if (!authTokenIsValid) return done(401);

        const venueExists = await checkVenueExists(venueId);
        if (!venueExists) {
            return done(404);
        }

        const venueAuthorized = await checkUserAuthorized(venueId, authToken);
        if (!venueAuthorized) return done(403);

        const venueHasPrimaryPhoto = await checkVenueHasPrimaryPhoto(venueId);
        if (!venueHasPrimaryPhoto) makePrimary = true;

        const photoFilename = venueId.toString() + "-" + photo.originalname;
        if (makePrimary == true) {
            await db.getPool().query(`UPDATE VenuePhoto SET is_primary = '0' WHERE venue_id = '${venueId}'`);
        }

        if (makePrimary == true) {
            makePrimary = 1;
        } else {
            makePrimary = 0;
        }

        const sql = `INSERT INTO VenuePhoto VALUES ('${venueId}', '${photoFilename}', '${description}', '${makePrimary}')`;
        await db.getPool().query(sql);
        await fs.writeFile(photosFilePath + photoFilename, photo.buffer, function(err) {
            if (err) {
                return done(400);
            }
        });
        return done(201);
    } catch (err) {
        return done(400);
    }
};


exports.getOne = async function(venueId, photoFilename, done, getPhoto) {
    try {
        const venueExists = await checkVenueExists(venueId);
        if (!venueExists) {
            return done(404);
        }

        const pathToPhoto = photosFilePath + photoFilename;
        const fileType =  photoFilename.substring(photoFilename.lastIndexOf(".") + 1, photoFilename.length);

        await fs.readFile(pathToPhoto, function (err, photo) {
            if (err) {
                return done(404);
            }
            return getPhoto(200, photo, fileType);
        });
    } catch (err){
        return done(404);
    }
};

exports.delete = async function(venueId, authToken, photoFilename, done) {
    const checkVenueHasPhoto = async function (venueId) {
        const result = await db.getPool().query(`SELECT * FROM VenuePhoto WHERE venue_id = '${venueId}'`);
        return result.length !== 0;
    };

    const checkVenueExists = async function (venueId) {
        const sql = `SELECT * FROM Venue WHERE venue_id = '${venueId}'`;
        const result = await db.getPool().query(sql);
        return result.length !== 0;
    };

    const checkPhotoIsPrimary = async function (venueId, photoFilename) {
        const sql = `SELECT is_primary FROM VenuePhoto WHERE venue_id = '${venueId}' AND photo_filename = '${photoFilename}'`;

        const result = await db.getPool().query(sql);
        return result[0].is_primary == 1;
    };
    try {

        const authTokenIsValid = await checkAuthTokenIsValid(authToken);
        if (!authTokenIsValid) return done (401);

        const userIsAuthorized = await checkUserAuthorized(venueId, authToken);
        if (!userIsAuthorized) return done(403);

        const venueHasPhoto = await checkVenueHasPhoto(venueId);
        if (!venueHasPhoto) return done(404);

        const venueExists = await checkVenueExists(venueId);
        if (!venueExists) return done(404);

        const photoIsPrimary = checkPhotoIsPrimary(venueId, photoFilename);

        const URI = photosFilePath + photoFilename;
        fs.unlink(URI, function (err, result) {
            if (err) return done(404);
        });

        const sql = `DELETE FROM VenuePhoto WHERE venue_id = '${venueId}' AND photo_filename = '${photoFilename}'`;
        await db.getPool().query(sql);

        const venueStillHasPhoto = await checkVenueHasPhoto(venueId);
        if (!venueStillHasPhoto) return done(200);
        if (photoIsPrimary) {
            const venuePhotoResult = await db.getPool().query(`SELECT * FROM VenuePhoto WHERE venue_id = '${venueId}'`);
            const filename = venuePhotoResult[0].photo_filename;
            await db.getPool().query(`UPDATE VenuePhoto SET is_primary = '1' WHERE venue_id = '${venueId}' AND photo_filename = '${filename}'`);
        }
        return done(200);

    } catch (err) {
        return done(404);
    }

};



exports.setPrimary = async function(venueId, photoFilename, authToken, done) {
    const checkPhotoExists = async function (venueId, photoFilename) {
        const result = await db.getPool().query(`SELECT * FROM VenuePhoto WHERE venue_id = '${venueId}' AND photo_filename = '${photoFilename}'`);
        return result.length !== 0;
    };
    try {
        const authTokenIsValid = await checkAuthTokenIsValid(authToken);
        if (!authTokenIsValid) return done(401);

        const userIsAuthorized = await checkUserAuthorized(venueId, authToken);
        if (!userIsAuthorized) return done(403);

        const photoExists = await checkPhotoExists(venueId, photoFilename);
        if (!photoExists) return done(404);

        await db.getPool().query(`UPDATE VenuePhoto SET is_primary = '0' WHERE venue_id = '${venueId}'`);
        await db.getPool().query(`UPDATE VenuePhoto SET is_primary ='1' WHERE venue_id = '${venueId}' AND photo_filename = '${photoFilename}'`);
        return done(200);
    } catch (err) {
        return done(404);
    }
};