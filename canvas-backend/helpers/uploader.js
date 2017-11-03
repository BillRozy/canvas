'use strict';
const path = require('path');

const multer  = require('multer');
const storage = multer.diskStorage({
  destination: 'uploads',
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const uploader = multer(
  {
    storage,
  });

module.exports = {
  uploadPhotos: uploader.array('photos', 10),
};
