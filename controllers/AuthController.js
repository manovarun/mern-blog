const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createSendToken = (user, statusCode, res) => {
  console.log(user);
  const token = user.getSignedJWTToken();

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  return res.status(statusCode).json({ status: 'success', token, user });
};

exports.signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(
      new AppError('Please provide a valid username, email and password', 400)
    );
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new AppError('User already exists', 400));
  }

  user = await User.create({ username, email, password });
  if (!user) {
    return next(new AppError('Unable to create user', 400));
  }

  return createSendToken(user, 201, res);
});

exports.signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide a valid email and password'));
  }

  const user = await User.findOne({ email });

  if (!user) return next(new AppError('User not found, please try again', 400));

  const isMatch = await user.matchPassword(password);
  if (!isMatch)
    return next(new AppError('Invalid password, please try again', 401));

  return createSendToken(user, 200, res);
});

exports.google = asyncHandler(async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    const { password, ...rest } = user._doc;
    return createSendToken(user, 201, res);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
    const newUser = new User({
      username:
        name.toLowerCase().split(' ').join('') +
        Math.random().toString(9).slice(-4),
      email,
      password: hashedPassword,
      profilePicture: googlePhotoUrl,
    });

    await newUser.save();
    const { password, ...rest } = newUser._doc;
    return createSendToken(newUser, 201, res);
  }
});
