const mongoose = require('mongoose');
//import mongoose from 'mongoose';
const { Schema } = mongoose;
const shareLinkSchema = new Schema({
  //created: new Date(),
  from: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  to: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 500
  },
  files: [
    { type: Schema.Types.ObjectId, ref: 'File' }
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('ShareLink', shareLinkSchema);