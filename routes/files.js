var express = require('express');
var router = express.Router();
const File = require('../models/file');
const ShareLink = require('../models/shareLink');
const _ = require('lodash');
const email = require('../email');
const uploadConfig = require('../config/storage').uploadConfig;
const storageDir = require('../config/storage').storageDir;
const passport = require('passport');
const { ObjectID } = require('mongodb');
const S3 = require('../s3');
// Upload routing
router.post('/upload', passport.authenticate('jwt', { session: false }), uploadConfig.array('files'), (req, res, next) => {
    const files = _.get(req, 'files', []);
    filesInfo = [];
    files.forEach((file) => {
        filesInfo.push({
            name: file.key,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            etag: file.etag
        });
    });
    if (filesInfo.length) {
        File.create(filesInfo, (err, result) => {
            if (err) {
                return res.status(503).json({
                    error: {
                        message: "Unable to save your files.",
                    }
                });
            }
            var shareLink = {
                from: _.get(req, 'body.from'),
                to: _.get(req, 'body.to'),
                message: _.get(req, 'body.message'),
                files: result.map((file) => { return file._id }),
            };
            ShareLink.create(shareLink, (err, result) => {
                if (err) {
                    return res.status(503).json({ error: { message: "Your upload could not be saved." } });
                }
                //implement email sending to user with download link.
                // send email
                email.send(result, (err, info) => {
                });
                // callback to react app with shareLink detail.
                return res.json(result);
            });
        });
    } else {
        return res.status(503).json({
            error: { message: "Files upload is required." }
        });
    }
});
//download file route
router.get('/download/:id', (req, res, next) => {
    const fileId = req.params.id;
    File.findOne({ _id: ObjectID(fileId) }, (err, result) => {
        const fileName = _.get(result, 'name');
        if (err || !fileName) {
            return res.status(404).json({
                error: {
                    message: "File not found."
                }
            })
        }
        const downloader = new S3(res);
        const downloadUrl = downloader.getDownloadUrl(result);
        downloader.download(result);
        // res.redirect(downloadUrl);
        /*
        var filePath = storageDir + '/' + fileName;
        return res.download(filePath, _.get(result, '[0].originalName'), (err) => {
            if (err) {
                return res.status(404).json({
                    error: {
                        message: "File not found"
                    }
                });
            }
        });
        */
    });
});
module.exports = router;