var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  email: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
