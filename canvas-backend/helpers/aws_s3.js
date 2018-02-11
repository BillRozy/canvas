'use strict';
const AWS = require('aws-sdk');
const awsS3Cfg = {
  region: process.env.S3_REGION || 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
const s3 = new AWS.S3(awsS3Cfg);
module.exports = s3;