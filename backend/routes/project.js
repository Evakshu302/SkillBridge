import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Category from '../models/Category.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, technologies, category, imageUrl, githubUrl, liveUrl } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Project title is required.' });
    }

    if (category !== undefined && category !== null && category !== '') {
      if (!mongoose.isValidObjectId(category)) {
        return res.status(400).json({ error: 'Invalid category ID.' });
      }
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ error: 'Category not found.' });
      }
    }

    if (technologies !== undefined && !Array.isArray(technologies)) {
      return res.status(400).json({ error: 'technologies must be an array of strings.' });
    }

    const project = await Project.create({
      title: title.trim(),
      description: description || '',
      technologies: technologies || [],
      category: category || null,
      imageUrl: imageUrl || '',
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      owner: req.user.id,
    });

    await project.populate(['category', { path: 'owner', select: 'fullName email' }]);
    return res.status(201).json({ success: true, project });
  } catch {
    return res.status(500).json({ error: 'Server error creating project.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { search, category, owner } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      if (!mongoose.isValidObjectId(category)) {
        return res.status(400).json({ error: 'Invalid category ID.' });
      }
      filter.category = category;
    }

    if (owner) {
      if (!mongoose.isValidObjectId(owner)) {
        return res.status(400).json({ error: 'Invalid owner ID.' });
      }
      filter.owner = owner;
    }

    const projects = await Project.find(filter)
      .populate('category')
      .populate('owner', 'fullName email')
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: projects.length, projects });
  } catch {
    return res.status(500).json({ error: 'Server error fetching projects.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid project ID.' });
    }

    const project = await Project.findById(req.params.id)
      .populate('category')
      .populate('owner', 'fullName email');

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    return res.json({ success: true, project });
  } catch {
    return res.status(500).json({ error: 'Server error fetching project.' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid project ID.' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorised to update this project.' });
    }

    const allowed = ['title', 'description', 'technologies', 'category', 'imageUrl', 'githubUrl', 'liveUrl'];
    const updates = {};

    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields provided to update.' });
    }

    if (updates.title !== undefined) {
      if (!updates.title || !updates.title.trim()) {
        return res.status(400).json({ error: 'Project title cannot be empty.' });
      }
      updates.title = updates.title.trim();
    }

    if (updates.technologies !== undefined && !Array.isArray(updates.technologies)) {
      return res.status(400).json({ error: 'technologies must be an array of strings.' });
    }

    if (updates.category !== undefined && updates.category !== null && updates.category !== '') {
      if (!mongoose.isValidObjectId(updates.category)) {
        return res.status(400).json({ error: 'Invalid category ID.' });
      }
      const categoryExists = await Category.findById(updates.category);
      if (!categoryExists) {
        return res.status(400).json({ error: 'Category not found.' });
      }
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    )
      .populate('category')
      .populate('owner', 'fullName email');

    return res.json({ success: true, project: updated });
  } catch {
    return res.status(500).json({ error: 'Server error updating project.' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid project ID.' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorised to delete this project.' });
    }

    await project.deleteOne();
    return res.json({ success: true, message: 'Project deleted.' });
  } catch {
    return res.status(500).json({ error: 'Server error deleting project.' });
  }
});

export default router;

