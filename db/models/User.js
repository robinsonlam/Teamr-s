var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
