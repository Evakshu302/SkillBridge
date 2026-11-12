import express from 'express';
import Category from '../models/Category.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required.' });
    }

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ error: 'Category already exists.' });
    }

    const category = await Category.create({ name: name.trim() });
    return res.status(201).json({ success: true, category });
  } catch {
    return res.status(500).json({ error: 'Server error creating category.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.json({ success: true, categories });
  } catch {
    return res.status(500).json({ error: 'Server error fetching categories.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    return res.json({ success: true, category });
  } catch {
    return res.status(500).json({ error: 'Server error fetching category.' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required.' });
    }

    const duplicate = await Category.findOne({ name: name.trim(), _id: { $ne: req.params.id } });
    if (duplicate) {
      return res.status(400).json({ error: 'A category with that name already exists.' });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    return res.json({ success: true, category });
  } catch {
    return res.status(500).json({ error: 'Server error updating category.' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    return res.json({ success: true, message: 'Category deleted.' });
  } catch {
    return res.status(500).json({ error: 'Server error deleting category.' });
  }
});

export default router;
