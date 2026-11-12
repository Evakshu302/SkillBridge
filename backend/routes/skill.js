import express from 'express';
import mongoose from 'mongoose';
import Skill from '../models/Skill.js';
import Category from '../models/Category.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, category } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Skill name is required.' });
    }

    if (!category) {
      return res.status(400).json({ error: 'Category is required.' });
    }

    if (!mongoose.isValidObjectId(category)) {
      return res.status(400).json({ error: 'Invalid category ID.' });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: 'Category not found.' });
    }

    const existing = await Skill.findOne({ name: name.trim(), category });
    if (existing) {
      return res.status(400).json({ error: 'A skill with that name already exists in this category.' });
    }

    const skill = await Skill.create({ name: name.trim(), description: description || '', category });
    await skill.populate('category');
    return res.status(201).json({ success: true, skill });
  } catch {
    return res.status(500).json({ error: 'Server error creating skill.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      if (!mongoose.isValidObjectId(category)) {
        return res.status(400).json({ error: 'Invalid category ID.' });
      }
      filter.category = category;
    }

    const skills = await Skill.find(filter).populate('category').sort({ name: 1 });
    return res.json({ success: true, count: skills.length, skills });
  } catch {
    return res.status(500).json({ error: 'Server error fetching skills.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid skill ID.' });
    }

    const skill = await Skill.findById(req.params.id).populate('category');
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found.' });
    }
    return res.json({ success: true, skill });
  } catch {
    return res.status(500).json({ error: 'Server error fetching skill.' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid skill ID.' });
    }

    const { name, description, category } = req.body;
    const updates = {};

    if (name !== undefined) {
      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Skill name cannot be empty.' });
      }
      updates.name = name.trim();
    }

    if (description !== undefined) {
      updates.description = description;
    }

    if (category !== undefined) {
      if (!mongoose.isValidObjectId(category)) {
        return res.status(400).json({ error: 'Invalid category ID.' });
      }
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ error: 'Category not found.' });
      }
      updates.category = category;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields provided to update.' });
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('category');

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found.' });
    }

    return res.json({ success: true, skill });
  } catch {
    return res.status(500).json({ error: 'Server error updating skill.' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid skill ID.' });
    }

    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found.' });
    }
    return res.json({ success: true, message: 'Skill deleted.' });
  } catch {
    return res.status(500).json({ error: 'Server error deleting skill.' });
  }
});

export default router;
