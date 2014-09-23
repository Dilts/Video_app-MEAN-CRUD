var mongoose = require('mongoose');

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
  userID:String
});


// Our user model
var User = mongoose.model('Users', userSchema);

// Make user model available through exports/require
module.exports.User = User;