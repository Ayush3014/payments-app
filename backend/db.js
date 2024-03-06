const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://thelivingfire01:7e760T3AsJqKj6fJ@cluster0.pm5bad6.mongodb.net/paymentsApp'
);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 5,
    maxLength: 100,
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
    required: true,
    trim: true,
    maxLength: 30,
  },
});

const User = mongoose.model('User', UserSchema);

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
  User,
  Account,
};
