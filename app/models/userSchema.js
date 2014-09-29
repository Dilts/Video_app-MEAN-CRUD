var mongoose = require('mongoose');
// var sourceSchema = require('../app/models/sourceSchema.js').Source;

// ______________________User Schema____________________
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
  source_id: String,
  // source: [
  // {_id: Youtube},
  // {_id: Vimeo}
  // ],
  comments: [
  {
    name: String,
    comment: String
  }],
  inform: [{dateCreated: {type: Date, default: Date.now}, category: String}],
  category: {
    cats: String,
    dogs: String,
    fails: String
  },
  time: {type: Date, default: Date.now}
});


// ________________Define User Model_____________________
var User = mongoose.model('Users', userSchema);

// Make user model available through exports/require
module.exports.User = User;