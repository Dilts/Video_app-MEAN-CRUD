var mongoose = require('mongoose');
// var sourceSchema = require('../app/models/sourceSchema.js').Source;

// User Schema
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  url: String,
  title: String,
  desc: String,
  userID: String,
  // source_id: [sourceSchema],
  category: [{
    cats: Boolean,
    dogs: Boolean,
    fails: Boolean
  }],
  time: {type: Date, default: Date.now}
});


// Our user model
var User = mongoose.model('Users', userSchema);

// Make user model available through exports/require
module.exports.User = User;