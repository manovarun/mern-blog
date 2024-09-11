const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter name'],
      trim: true,
      minlength: 2,
      unique: true,
      validate: [
        validator.isAlphanumeric,
        'Username must contain only alphanumeric characters',
      ],
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minlength: 6,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
