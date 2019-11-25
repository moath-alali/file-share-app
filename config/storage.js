const conf = {};
const { smtp, s3Config, s3Region, s3Bucket } = require('./index');
var path = require('path');
const multer = require('multer');
// File storage config
conf.storageDir = path.join(__dirname, '..', 'storage');
conf.multer = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, conf.storageDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
conf.uploadConfig = multer({ storage: conf.multer });
// Amazon S3 Setup
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
AWS.config.update(s3Config);
AWS.config.region = s3Region;
conf.s3 = new AWS.S3();
conf.uploadConfig = multer({
  storage: multerS3({
    s3: conf.s3,
    bucket: s3Bucket,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const filename = `${Date.now().toString()}-${file.originalname}`;
      cb(null, filename)
    }
  })
})
module.exports = conf;