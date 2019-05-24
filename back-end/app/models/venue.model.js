const db = require('../../config/db');


exports.getAllCategories = function(done) {
    db.getPool().query('SELECT * FROM VenueCategory', function (err, result) {
        if (err) return done(400);
        const categories = [];
        for (i = 0; i < result.length; i++) {
            let category = {};
            category.categoryId = result[i].category_id;
            category.categoryName = result[i].category_name;
            category.categoryDescription = result[i].category_description;
            categories.push(category);
        }
        return done(200, categories);
    });
};


exports.edit = async function (venueId, authToken, venueData, done) {
    const checkUserIsAdmin = async function (venueId, authToken) {
        const user_id_sql = `SELECT user_id FROM User WHERE auth_token = '${authToken}'`;
        const user_id_result = await db.getPool().query(user_id_sql);

        const admin_id_sql = `SELECT admin_id from Venue WHERE venue_id = '${venueId}'`;
        const admin_id_result = await db.getPool().query(admin_id_sql);

        return user_id_result[0].user_id === admin_id_result[0].admin_id;
    };

    const checkChangesProvided = async function (venueData) {
        return venueData.length !== 0;
    };

    try {
        const userIsAdmin = await checkUserIsAdmin(venueId, authToken);
        if (!userIsAdmin) return done(403);

        const changesProvided = await checkChangesProvided(venueData);
        if (!changesProvided) return done(400);

        let values = {};

        if (venueData.hasOwnProperty("venueName")) values.venue_name = venueData.venueName;
        if (venueData.hasOwnProperty("categoryId")) values.category_id = venueData.categoryId;
        if (venueData.hasOwnProperty("city")) values.city = venueData.city;
        if (venueData.hasOwnProperty("shortDescription")) values.short_description = venueData.shortDescription;
        if (venueData.hasOwnProperty("longDescription")) values.long_description = venueData.longDescription;
        if (venueData.hasOwnProperty("address")) values.address = venueData.address;
        if (venueData.hasOwnProperty("latitude")) values.latitude = venueData.latitude;
        if (venueData.hasOwnProperty("longitude")) values.longitude = venueData.longitude;

        await db.getPool().query("UPDATE Venue SET ? WHERE venue_id = ?", [values, venueId]);
        return done(200);
    } catch (err) {
        console.log(err);
        return done(400);
    }

};


exports.insert = async function(authToken, venue_data, done) {
    const generateTimestamp = function () {
        var today = new Date();
        var yyyy = today.getFullYear();
        var MM = String(today.getMonth() + 1).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        var hh = String(today.getHours());
        var mm = String(today.getMinutes());
        var ss = String(today.getSeconds());

        today = yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm + ":" + ss + ".000Z";
        return today;
    };

    const getAdminId = async function (authToken) {
        const admin_id_result = await db.getPool().query(`SELECT user_id FROM User WHERE auth_token = '${authToken}'`);
        if (admin_id_result.length === 0) return null;
        return admin_id_result[0].user_id;
    };

    try {
        venue_data.date_added = generateTimestamp();

        const adminId = await getAdminId(authToken);
        if (!adminId) return done(401);
        venue_data.admin_id = adminId;

        const insertSql = `INSERT INTO Venue (admin_id, venue_name, category_id, city, short_description, long_description, date_added, address, longitude, latitude) `
        + `VALUES ("${venue_data["admin_id"]}", "${venue_data["venue_name"]}", '${venue_data["category_id"]}', "${venue_data["city"]}", "${venue_data["short_description"]}", `
        + `"${venue_data["long_description"]}", "${venue_data["date_added"]}", "${venue_data["address"]}", "${venue_data["longitude"]}", "${venue_data["latitude"]}")`;

        const result = await db.getPool().query(insertSql, function(err, result) {
            if (err) return done(400);
            return done(201, {"venueId": result.insertId});
        });

    } catch (err){
        return done(400);
    }
};


exports.getOne = async function(venueId, done) {
    const getAdminInfo = async function (adminId) {
        try {
            adminInfo = {};
            const result = await db.getPool().query(`SELECT username FROM User WHERE user_id = '${adminId}'`);
            if (result.length === 0 ) return null;
            adminInfo.userId = adminId;
            adminInfo.username = result[0].username;
            return adminInfo;
        } catch {
            return null;
        }
    };

    const getCategoryInfo = async function (categoryId) {
        try {
            categoryInfo = {};
            const result = await db.getPool().query(`SELECT category_name, category_description FROM VenueCategory WHERE category_id = '${categoryId}'`);
            if (result.length === 0 ) return null;
            categoryInfo.categoryId = categoryId;
            categoryInfo.categoryName = result[0].category_name;
            categoryInfo.categoryDescription = result[0].category_description;
            return categoryInfo;
        } catch {
            return null;
        }
    };

    const getPhotoInfo = async function (venueId) {
        try {
            const result = await db.getPool().query(`SELECT photo_filename, photo_description, is_primary FROM VenuePhoto WHERE venue_id = '${venueId}'`);
            const photos = [];
            for (i = 0; i < result.length; i++) {
                let photoInfo = {};
                photoInfo.photoFilename = result[i].photo_filename;
                photoInfo.photoDescription = result[i].photo_description;
                photoInfo.isPrimary = result[i].is_primary == 1;
                photos.push(photoInfo);
            }
            return photos;
        } catch {
            return null;
        }
    };


    try {
        let sql = `SELECT * FROM Venue WHERE venue_id = '${venueId}'`;
        const venue_result = await db.getPool().query(sql);
        if (venue_result.length === 0) return done(404);


        venue = {};
        venue.venueName = venue_result[0].venue_name;

        let adminInfo = await getAdminInfo(venue_result[0].admin_id);

        if (!adminInfo) return done(404);
        venue.admin = adminInfo;
        let categoryInfo = await getCategoryInfo(venue_result[0].category_id);

        if (!categoryInfo) return done(404);
        venue.category = categoryInfo;
        venue.city = venue_result[0].city;
        venue.shortDescription = venue_result[0].short_description;
        venue.longDescription = venue_result[0].long_description;
        venue.dateAdded = venue_result[0].date_added;
        venue.address = venue_result[0].address;
        venue.latitude = venue_result[0].latitude;
        venue.longitude = venue_result[0].longitude;
        let photoInfo = await getPhotoInfo(venueId);

        if (!photoInfo) return done(404);
        venue.photos = photoInfo;
        return done(200, venue);
    } catch {
        return done(400);
    }

};

exports.getAll = async function(queryValues, done) {
    const getLowerLimit = function(queryValues) {
        if (queryValues.startIndex) {
            return Number(queryValues.startIndex);
        } else {
            return 0;
        }
    };

    const checkHasWhereStatement = function(queryValues, whereColumns) {
        for (const column of whereColumns) {
            if (queryValues.hasOwnProperty(column)) return true;
        }
        return false;
    };

    const checkHasHavingStatement = function (queryValues, havingColumns) {
        for (const column of havingColumns) {
            if (queryValues.hasOwnProperty(column)) return true;
        }
        return false;
    };

    const getWhereStatement = function(queryValues, hasWhereStatement) {
        if (!hasWhereStatement) return "";
        let whereStatement = " WHERE ";
        if (queryValues.hasOwnProperty("city")) whereStatement += `city = '${queryValues.city}' AND `;
        if (queryValues.hasOwnProperty("q")) whereStatement += `venue_name LIKE '%${queryValues.q}%' AND `;
        if (queryValues.hasOwnProperty("categoryId")) whereStatement += `category_id = '${queryValues.categoryId}' AND `;
        if (queryValues.hasOwnProperty("adminId")) whereStatement += `admin_id = '${queryValues.adminId}' AND `;
        return whereStatement.slice(0, -5); // remove ' AND ' at the end
    };

    const getHavingStatement = function(queryValues, hasHavingStatement) {
        if (!hasHavingStatement) return "";
        let havingStatement = " HAVING ";
        if (queryValues.hasOwnProperty("minStarRating")) {
            havingStatement += `mean_star_rating >= '${queryValues.minStarRating}' AND `;
        }
        if (queryValues.hasOwnProperty("maxCostRating")) {
            havingStatement += `mode_cost_rating <= '${queryValues.maxCostRating}' AND `;
        }
        return havingStatement.slice(0, -5);
    };

    const getPrimaryPhoto = async function(venue) {
        const sql = `SELECT photo_filename FROM VenuePhoto WHERE venue_id = '${venue.venue_id}' AND is_primary = '1'`;
        const result = await db.getPool().query(sql);
        return result[0];
    };

    const checkIncludeDistance = function(queryValues) {
        return queryValues.hasOwnProperty("myLatitude") && queryValues.hasOwnProperty("myLongitude");
    };

    const getSortedColumn = function(queryValues) {
        if (queryValues.hasOwnProperty("sortBy")) {
            if (queryValues.sortBy == "star_rating") return "mean_star_rating";
            if (queryValues.sortBy == "cost_rating") return "mode_cost_rating";
            return queryValues.sortBy;
        }
        return "mean_star_rating";
    };

    const getOrderByStatement = function(queryValues) {
        const sortedColumn = getSortedColumn(queryValues);
        orderByStatement = ` ORDER BY ${sortedColumn}`;
        let desc = false;
        if (sortedColumn.toLowerCase() == "mean_star_rating") desc = true;
        if (sortedColumn.toLowerCase() == "mode_cost_rating") desc = false;
        if (sortedColumn.toLowerCase() == "distance") desc = false;
        console.log(desc);
        if (queryValues.reverseSort == "true") desc = !desc;
        console.log(desc);
        if (desc == true) orderByStatement += ' DESC';
        return orderByStatement;
    };

    try {
        let sql;
        if (checkIncludeDistance(queryValues)) {
            const userLatitude = queryValues.myLatitude;
            const userLongitude = queryValues.myLongitude;
            sql = `SELECT Venue.venue_id, venue_name, category_id, city, short_description, latitude, longitude, AVG(star_rating) AS mean_star_rating, mode_cost_rating, ROUND((3959*acos(cos(radians(${userLatitude}))*cos(radians(latitude))*cos(` +
                `radians(longitude)-radians(${userLongitude}))+sin(radians(${userLatitude}))*sin(radians(latitude)))), 3) AS distance FROM Venue LEFT JOIN Review ON Venue.venue_id = reviewed_venue_id LEFT JOIN ModeCostRating ON Venue.venue_id = ModeCostRating.venue_id`;
        } else {
            sql = 'SELECT Venue.venue_id, venue_name, category_id, city, short_description, latitude, longitude, AVG(star_rating) AS mean_star_rating, mode_cost_rating FROM Venue LEFT JOIN Review ON Venue.venue_id = reviewed_venue_id LEFT JOIN ModeCostRating ON Venue.venue_id = ModeCostRating.venue_id';
        }

        const whereColumns = ["city", "q", "categoryId", "adminId"];
        const havingColumns = ["minStarRating", "maxCostRating"];
        const hasWhereStatement = checkHasWhereStatement(queryValues, whereColumns);
        const hasHavingStatement = checkHasHavingStatement(queryValues, havingColumns);
        const lowerLimit = getLowerLimit(queryValues);

        sql += getWhereStatement(queryValues, hasWhereStatement);
        sql += ' GROUP BY Venue.venue_id';
        sql += getHavingStatement(queryValues, hasHavingStatement);
        sql += getOrderByStatement(queryValues);

        console.log(sql);

        let result = await db.getPool().query(sql);
        let count = result.length;
        if (queryValues.hasOwnProperty("count")) count = Number(queryValues.count);
        result = result.slice(lowerLimit, lowerLimit + count);

        const venues = [];
        for (i = 0; i < result.length; i++) {
            venue = {};
            venue.venueId = result[i].venue_id;
            venue.venueName = result[i].venue_name;
            venue.categoryId = result[i].category_id;
            venue.city = result[i].city;
            venue.shortDescription = result[i].short_description;
            venue.latitude = result[i].latitude;
            venue.longitude = result[i].longitude;
            venue.meanStarRating = result[i].mean_star_rating;
            venue.modeCostRating = result[i].mode_cost_rating;
            venue.primaryPhoto = await getPrimaryPhoto(result[i]);
            if (checkIncludeDistance(queryValues)) venue.distance = result[i].distance;
            if (Object.keys(venue).length !== 0) venues.push(venue);
        }


        return done(200, venues);

    } catch (err) {
        console.log(err);
        return done(400);
    }
};
