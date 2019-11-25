const _ = require('lodash');
const { externalURL } = require('./config');
const sgMail = require('@sendgrid/mail');
const sendGridKey = require('./config/index').sendGridKey;
module.exports.send = function sendDownloadLink(post, callback = () => { }) {
    const from = _.get(post, 'from');  // post.from;
    const to = _.get(post, 'to');
    const message = _.get(post, 'message', '');
    const postId = _.get(post, '_id');
    const downloadLink = `${externalURL}/share-links/${postId}`;
    let messageOptions = {
        from: from,//from, // sender address
        to: to, // list of receivers
        subject: '[Share] Download Invitation',
        text: message,
        html: `<p>${from} has sent to you file. Click <a href="${downloadLink}">here</a> to download.</p><p>Message: ${message}</p>`
    };
    sgMail.setApiKey(sendGridKey);
    const msg = {
        to: to,
        from: from,
        subject: '[Share] Download Invitation',
        text: message,
        html: `<p>${from} has sent to you file. Click <a href="${downloadLink}">here</a> to download.</p><p>Message: ${message}</p>`,
    };
    sgMail.send(msg);
    // // send mail with defined transport object
    // email.sendMail(messageOptions, (error, info) => {

    //     console.log("Sending an email with callback", error, info);

    //     return callback(error, info);
    // });
}
