const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const allowCrossOriginRequests = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
};

module.exports = function () {
    const app = express();
    app.rootUrl = '/api/v1';

    // MIDDLEWARE
    app.use(allowCrossOriginRequests);
    app.use(bodyParser.json());
    app.use(bodyParser.raw({ type: 'text/plain' }));  // for the /executeSql endpoint
    app.use(bodyParser.raw({ type: 'image/jpeg', limit: '10mb'}));
    app.use(bodyParser.raw({ type: 'image/png', limit: '10mb'}));
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(upload.single('photo'));

    // ROUTES
    require('../app/routes/backdoor.routes')(app);
    require('../app/routes/user.routes')(app);
    require('../app/routes/venue.routes')(app);
    require('../app/routes/review.routes')(app);
    require('../app/routes/userPhoto.routes')(app);
    require('../app/routes/venuePhoto.routes')(app);

    if (fs.existsSync('./storage/photos')) {
    } else {
        fs.mkdir('./storage/photos', {recursive: true }, (err) => {
            if (err) console.log(err);
        });
    }

    return app;
};
