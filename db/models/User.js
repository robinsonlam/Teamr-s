var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

var UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  email: String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  updated_at: { type: Date, default: Date.now },
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);
