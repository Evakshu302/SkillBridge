import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json({ success: true, user });
  } catch {
    return res.status(500).json({ error: 'Server error fetching profile.' });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  const allowed = ['fullName', 'title', 'bio', 'skills', 'location', 'avatarUrl'];
  const updates = {};

  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No valid fields provided to update.' });
  }

  if (updates.fullName !== undefined) {
    if (typeof updates.fullName !== 'string' || updates.fullName.trim().length < 2) {
      return res.status(400).json({ error: 'fullName must be at least 2 characters.' });
    }
    updates.fullName = updates.fullName.trim();
  }

  if (updates.skills !== undefined && !Array.isArray(updates.skills)) {
    return res.status(400).json({ error: 'skills must be an array of strings.' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json({ success: true, user });
  } catch {
    return res.status(500).json({ error: 'Server error updating profile.' });
  }
});

export default router;

