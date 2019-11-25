var express = require('express');
var router = express.Router();
const File = require('../models/file');
const ShareLink = require('../models/shareLink');
const _ = require('lodash');
const FileArchiver = require('../archiver');
// routing for shareLink detail /api/shareLinks/:id
router.get('/:id', (req, res, next) => {
    const shareLinkId = _.get(req, 'params.id');
    return getShareLinkById(shareLinkId, (err, result) => {
        if (err) {
            return res.status(404).json({ error: { message: 'File not found.' } });
        }
        return res.json(result);
    });
});
// Routing download zip files.
router.get('/:id/download', (req, res, next) => {
    const id = _.get(req, 'params.id', null);
    getShareLinkById(id, (err, result) => {
        if (err) {
            return res.status(404).json({ error: { message: 'File not found.' } });
        }
        const files = _.get(result, 'files', []);
        const archiver = new FileArchiver(files, res).download();
        return archiver;
    })
});
function getShareLinkById(id, callback = () => { }) {
    ShareLink.findById(id, (err, result) => {
        if (err || !result) {
            return callback(err ? err : new Error("File not found."));
        }
        const fileIds = _.get(result, 'files', []);
        File.find({ _id: { $in: fileIds } }, (err, files) => {
            if (err || !files || !files.length) {
                return callback(err ? err : new Error("File not found."));
            }
            result.files = files;
            return callback(null, result);
        });
    })
}
module.exports = router;