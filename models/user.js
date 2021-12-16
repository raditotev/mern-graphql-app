const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

module.exports = model('User', userSchema);
