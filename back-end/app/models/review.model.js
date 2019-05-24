const db = require('../../config/db');

exports.getAllVenue = async function (venueId, done) {
    try {
        let sqlJoinReviewVenue = `SELECT * FROM Review INNER JOIN Venue ON venue_id = reviewed_venue_id WHERE venue_id = '${venueId}' ORDER BY time_posted DESC`;
        let result = await db.getPool().query(sqlJoinReviewVenue);
        let reviews = [];
        for (i = 0; i < result.length; i++) {
            let reviewerId = result[i].review_author_id;
            let sqlJoinReviewUser = `SELECT username FROM Review INNER JOIN User ON user_id = review_author_id WHERE review_author_id = '${reviewerId}'`;
            let reviewerUsernameResult = await db.getPool().query(sqlJoinReviewUser);
            let reviewerUsername = reviewerUsernameResult[0].username;
            let review = {};
            let reviewAuthor = {};
            reviewAuthor.userId = result[i].review_author_id;
            reviewAuthor.username = reviewerUsername;

            review.reviewAuthor = reviewAuthor;
            review.reviewBody = result[i].review_body;
            review.starRating = result[i].star_rating;
            review.costRating = result[i].cost_rating;
            review.timePosted = result[i].time_posted;
            reviews.push(review);
        }
        return done(201, reviews);
    } catch {
        return done(404);
    }
};

exports.getAllUser = async function(userId, authToken, done) {
    const getPrimaryPhoto = async function (userId) {
        const result = await db.getPool().query(`SELECT profile_photo_filename FROM User WHERE user_id = '${userId}'`);
        return result[0].profile_photo_filename;
    };

    const getCategoryName = async function(categoryId) {
        const result = await db.getPool().query(`SELECT category_name FROM VenueCategory WHERE category_id = '${categoryId}'`);
        return result[0].category_name;
    };
    try {
        let sqlJoinReviewUser = `SELECT * FROM Review INNER JOIN User ON review_author_id = user_id WHERE user_id = '${userId}' ORDER BY time_posted DESC`;
        let result = await db.getPool().query(sqlJoinReviewUser);

        let reviews = [];
        for (i = 0; i < result.length; i++) {
            let reviewerId = result[i].review_author_id;
            let sqlJoinReviewUser = `SELECT username FROM Review INNER JOIN User ON user_id = review_author_id WHERE review_author_id = '${reviewerId}'`;
            let reviewerUsernameResult = await db.getPool().query(sqlJoinReviewUser);
            let reviewerUsername = reviewerUsernameResult[0].username;

            let reviewedVenueId = result[i].reviewed_venue_id;
            let sqlJoinReviewVenue = `SELECT * FROM Venue INNER JOIN Review ON venue_id = reviewed_venue_id WHERE reviewed_venue_id = '${reviewedVenueId}'`;
            let review = {};

            let reviewAuthor = {};
            reviewAuthor.userId = result[i].review_author_id;
            reviewAuthor.username = reviewerUsername;
            review.reviewAuthor = reviewAuthor;

            review.reviewBody = result[i].review_body;
            review.starRating = result[i].star_rating;
            review.costRating = result[i].cost_rating;
            review.timePosted = result[i].time_posted;

            let venueResult = await db.getPool().query(sqlJoinReviewVenue);
            let venueValues = venueResult[0];
            let venue = {};
            venue.venueId = venueValues.venue_id;
            venue.venueName = venueValues.venue_name;
            venue.categoryName = await getCategoryName(venueValues.category_id);
            venue.city = venueValues.city;
            venue.shortDescription = venueValues.short_description;
            venue.primaryPhoto = await getPrimaryPhoto(userId);
            review.venue = venue;
            reviews.push(review);
        }
        return done(200, reviews);
    } catch {
        return done(404);
    }
};

exports.insert = async function (reviewData, authToken, done) {
    const generateReviewDataList = function (reviewData) {
        reviewDataArray = [];
        reviewDataArray.push(reviewData.reviewed_venue_id);
        reviewDataArray.push(reviewData.review_author_id);
        reviewDataArray.push(reviewData.review_body);
        reviewDataArray.push(reviewData.star_rating);
        reviewDataArray.push(reviewData.cost_rating);
        reviewDataArray.push(reviewData.time_posted);
        return reviewDataArray;
    };

    const userIsAdminOfVenue = async function (userId, reviewData) {
        try {
            const venueAdminResult = await db.getPool().query(`SELECT admin_id FROM Venue WHERE venue_id = '${reviewData.reviewed_venue_id}'`);
            let venueAdminId = venueAdminResult[0].admin_id;
            return venueAdminId == userId;
        } catch (err) {
            return true;
        }
    };

    const userHasAlreadyReviewedVenue = async function (userId, reviewData) {
        const reviewAuthorIdsResult = await db.getPool().query(`SELECT review_author_id FROM Review WHERE reviewed_venue_id = '${reviewData.reviewed_venue_id}'`);
        const reviewAuthorIds = reviewAuthorIdsResult[0];
        for (i = 0; i < reviewAuthorIdsResult.length; i++) {
            let reviewAuthorId = reviewAuthorIdsResult[i].review_author_id;
            if (reviewAuthorId == userId) return true;
        }
        return false;
    };

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

    try {
        const userIdResult = await db.getPool().query(`SELECT user_id FROM User WHERE auth_token = '${authToken}'`);

        if (userIdResult.length === 0) return done(401);
        let userId = userIdResult[0].user_id;
        reviewData.review_author_id = userId;

        if (await userIsAdminOfVenue(userId, reviewData)) return done(403);
        if (await userHasAlreadyReviewedVenue(userId, reviewData)) return done(403);

        reviewData.time_posted = generateTimestamp();
        reviewDataArray = generateReviewDataList(reviewData);

        await db.getPool().query("INSERT INTO Review (reviewed_venue_id, review_author_id, review_body, star_rating, cost_rating, time_posted) VALUES (?)", [reviewDataArray]);
        return done(201);

    } catch(err) {
        return done(400);
    }
};




