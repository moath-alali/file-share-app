const _ = require('lodash');
const { s3Bucket } = require('./config');
const s3 = require('./config/storage').s3;
module.exports = class S3 {
    constructor(response) {
        this.response = response;
    }
    getObject(file) {
        const options = {
            Bucket: s3Bucket,
            Key: _.get(file, 'name')
        };
        return s3.getObject(options).createReadStream();
    }
    download(file) {
        const response = this.response;
        const filename = _.get(file, 'originalName');
        response.attachment(filename);
        const options = {
            Bucket: s3Bucket,
            Key: _.get(file, 'name')
        };
        const fileObject = s3.getObject(options).createReadStream();
        fileObject.pipe(response);
    }
    getDownloadUrl(file) {
        const options = {
            Bucket: s3Bucket,
            Key: _.get(file, 'name'),
            Expires: 3600,
        };
        const url = s3.getSignedUrl('getObject', options);
        return url;
    }
}