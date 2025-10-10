

import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// User signup
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(409).json({ status: false, message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    return res.status(201).json({
      message: 'User created successfully.',
      user_id: String(user._id)
    });
  } catch (err) {
    next(err);
  }
};

// User login
export const login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne(email ? { email } : { username });
    if (!user) {
      return res.status(401).json({ status: false, message: 'Invalid Username and password' });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ status: false, message: 'Invalid Username and password' });
    }

    return res.status(200).json({
      message: 'Login successful.'
    });
  } catch (err) {
    next(err);
  }
};