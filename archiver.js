const archiver = require('archiver');
const _ = require('lodash');
var fs = require('fs');
const S3 = require('./s3');
const storageDir = require('./config/storage').storageDir;
module.exports = class FileArchiver {
    constructor(files = [], response) {
        this.files = files;
        this.response = response;
    }
    download() {
        const files = this.files;
        const zip = archiver('zip');
        const response = this.response;
        response.attachment('download.zip');
        zip.pipe(response);
        const s3Downloader = new S3(response);
        _.each(files, (file) => {
            const fileObject = s3Downloader.getObject(file);
            zip.append(fileObject, {name: _.get(file, 'originalName')});
            /*
            var arFile = storageDir + '/' + file.name;
            zip.append(fs.createReadStream(arFile), { name: file.originalName });
            */
        });
        zip.finalize();
        return this;
    }
}