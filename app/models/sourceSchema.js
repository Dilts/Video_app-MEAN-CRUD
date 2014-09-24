var mongoose = require('mongoose');

// User Schema
var sourceSchema = mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    unique: true
  },
});


// Our user model
var Source = mongoose.model('Source', sourceSchema);

// Make user model available through exports/require
module.exports.Source = Source;