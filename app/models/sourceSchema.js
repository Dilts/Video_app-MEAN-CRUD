var mongoose = require('mongoose');

// _____________________________User Schema____________________________
var videoSchema = mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    unique: true
  },
  uploads:[{
    ObjectID
  }]
});


// ______________________Our User Model________________________

var Video = mongoose.model('Video', videoSchema);

// Make user model available through exports/require
module.exports.Video = Video;