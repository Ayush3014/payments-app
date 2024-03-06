const express = require('express');

const zod = require('zod');
const { User } = require('../db');
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

const signUpSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

userRouter.post('/signup', async (req, res) => {
  const parsedSignUp = signUpSchema.safeParse(req.body);
  if (!parsedSignUp.success) {
    return res
      .status(411)
      .json({ message: 'Email already taken / incorrect inputs' });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res
      .status(411)
      .json({ message: 'Email already taken / incorrect inputs' });
  }

  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });

  const userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({ message: 'User created successfully', token: token });
});

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

userRouter.post('/signin', async (req, res) => {
  const parsedSingIn = signInSchema.safeParse(req.body);
  if (!parsedSingIn.success) {
    res.status(411).json({ message: 'Error while logging in' });
  }

  const user = await findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.status(200).json({ token: token });
    return;
  } else {
    res.status(411).json({ message: 'Error while logging in' });
  }
});

module.exports = userRouter;
