'use strict';
const path = require('path');

const multer  = require('multer');
const storage = multer.diskStorage({
  destination: path.join(__basedir, 'uploads'),
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer(
  {
    storage,
  });

module.exports = upload;
