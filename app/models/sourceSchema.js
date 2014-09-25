var mongoose = require('mongoose');

// User Schema
var videoSchema = mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    unique: true
  },
});


// Our user model
var Video = mongoose.model('Video', videoSchema);

// Make user model available through exports/require
module.exports.Video = Video;