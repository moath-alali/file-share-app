const mongoose = require('mongoose');
//import mongoose from 'mongoose';
const { Schema } = mongoose;
const fileSchema = new Schema({
    //created: new Date(),
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    originalName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    mimeType: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    etag: {
        type: String
    },
    size: {
        type: Schema.Types.Decimal128,
        required: true
    }
});
module.exports = mongoose.model('File', fileSchema);