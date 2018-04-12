var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

var TeamUserSchema = Schema({
  _userId: { type: Schema.Types.ObjectId, ref: 'User' },
  _teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  role: String,
  first_name: { type: Schema.Types.String, ref: 'User' },
  last_name: { type: Schema.Types.String, ref: 'User' },
  email: { type: Schema.Types.String, ref: 'User' },
  updated_at: { type: Date, default: Date.now },
});

TeamUserSchema.plugin(findOrCreate);

module.exports = mongoose.model('TeamUser', TeamUserSchema);
