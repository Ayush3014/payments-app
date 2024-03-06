const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/paymentsApp');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 5,
    maxLength: 25,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    rquired: true,
    trim: true,
    maxLength: 30,
  },
});

const User = mongoose.model('Users', UserSchema);

module.exports = {
  User,
};
