const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true, max: 40 },
  lastname: { type: String, required: true, max: 40 },
  email: { type: String, required: true, match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ },
  username: { type: String, unique: true, required: true, min: 3, max: 40 },
  password: { type: String, required: true, min: 5, max: 40 },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: Number, required: true },
  },
  isadmin: { type: Boolean, default: true },
});

// Tehdään UserSchemasta model
const User = mongoose.model('User', UserSchema);

module.exports = User;
