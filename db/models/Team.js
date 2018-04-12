var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

var TeamSchema = Schema({
  name: String,
  sport: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  updated_at: { type: Date, default: Date.now },
});

TeamSchema.plugin(findOrCreate);

module.exports = mongoose.model('Team', TeamSchema);
