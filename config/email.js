const conf = {};
const nodemailer = require('nodemailer');
const { smtp } = require('./index');
// Setup Email
conf.email = nodemailer.createTransport(smtp);
module.exports = conf;