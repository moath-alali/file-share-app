var express = require('express');
var router = express.Router();
const { version } = require('../package.json');
/* GET home page. */
router.get('/', function (req, res, next) {
    return res.status(200).json({
        version: version
    });
});
module.exports = router;
