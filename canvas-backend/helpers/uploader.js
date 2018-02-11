'use strict';
const s3 = require('./aws_s3');
const multerS3 = require('multer-s3');
const multer  = require('multer');
function makeStorage(opts) {
  return process.env.NODE_ENV !== 'production' ? multer.diskStorage(opts) : multerS3(opts);
}
function createCommonStorageOptions() {
  if (process.env.NODE_ENV !== 'production') {
    return {
      destination: 'uploads',
      filename(req, file, cb) {
        cb(null, `photos/${req.user.id}/${Date.now()}-${file.originalname}`);
      },
    };
  } else {
    return {
      s3,
      bucket: process.env.S3_BUCKET || 'canvas-backend-storage',
      metadata(req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key(req, file, cb) {
        cb(null, `photos/${req.user.id}/${Date.now()}-${file.originalname}`);
      },
    };
  }
}

function createAvatarStorageOptions() {
  if (process.env.NODE_ENV !== 'production') {
    return {
      destination: 'uploads/avatars',
      filename(req, file, cb) {
        cb(null, req.user.id + '-avatar.jpg');
      },
    };
  } else {
    return {
      s3,
      bucket: process.env.S3_BUCKET || 'canvas-backend-storage',
      metadata(req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key(req, file, cb) {
        cb(null, req.user.id + '-avatar.jpg');
      },
    };
  }
}
const uploader = multer(
  {
    storage: makeStorage(createCommonStorageOptions()),
  });
const avaUploader = multer(
  {
    storage: makeStorage(createAvatarStorageOptions()),
  });

module.exports = {
  uploadPhotos: uploader.array('photos', 10),
  uploadAvatar: avaUploader.single('avatar'),
};
