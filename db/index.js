const mongoose = require('mongoose');
const MONGO_URL = require('../config/index').MONGO_URL;
mongoose.Promise = global.Promise;
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true

    })
    .catch(e => {
        console.error('Connection error', e.message)
    });
mongoose.connection
    .on('open', () => console.info('Database connected!'))
    .on('error', err => console.info('Create a database and put the link into config/index.js/MONGO_URL'));
const db = mongoose.connection
module.exports = db;