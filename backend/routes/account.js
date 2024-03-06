const express = require('express');
const { Account } = require('../db');
const accountRouter = express.Router();
import { authMiddleware } from '../middleware';

accountRouter.get('/balance', authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({ balance: account.balance });
});

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  // starting the transaction
  session.startTransaction();
  const { amount, to } = req.body;

  // find account within this transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: 'Insufficient balance',
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: 'Invalid account',
    });
  }

  // amount transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({ message: 'Transfer successful' });
});

module.exports = accountRouter;
