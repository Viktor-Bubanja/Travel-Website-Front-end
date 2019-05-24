const venuePhoto = require('../controllers/venuePhoto.controller');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

module.exports = function (app) {

    //app.use(app.rootUrl + '/venues/:id/photos', upload.single('photo'));

    app.route(app.rootUrl + '/venues/:id/photos')
        .post(venuePhoto.create);

    app.route(app.rootUrl + '/venues/:id/photos/:filename')
        .get(venuePhoto.read)
        .delete(venuePhoto.remove);

    app.route(app.rootUrl + '/venues/:id/photos/:filename/setPrimary')
        .post(venuePhoto.makePrimary)
};