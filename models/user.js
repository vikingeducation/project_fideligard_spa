const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
