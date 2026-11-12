import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'Please provide fullName, email and password.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    const user = await User.create({ fullName: fullName.trim(), email: email.toLowerCase(), password });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: { id: user.id, fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error during registration.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, fullName: user.fullName, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful.',
      user: { id: user.id, fullName: user.fullName, email: user.email },
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error during login.', details: error.message });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json({
      success: true,
      user: { id: user.id, fullName: user.fullName, email: user.email },
    });
  } catch {
    return res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
