'use strict';
const path = require('path');

const multer  = require('multer');
const storage = multer.diskStorage({
  destination: 'uploads',
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const avatarStorage = multer.diskStorage({
  destination: 'uploads/avatars',
  filename(req, file, cb) {
    cb(null, req.user.id + '-avatar.jpg');
  },
});
const uploader = multer(
  {
    storage,
  });
const avaUploader = multer(
  {
    storage: avatarStorage,
  });

module.exports = {
  uploadPhotos: uploader.array('photos', 10),
  uploadAvatar: avaUploader.single('avatar'),
};
