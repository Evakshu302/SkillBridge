import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const isValidId = (id) => mongoose.isValidObjectId(id);

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { content, imageUrl, tags } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Post content is required.' });
    }

    if (tags !== undefined && !Array.isArray(tags)) {
      return res.status(400).json({ error: 'tags must be an array of strings.' });
    }

    const post = await Post.create({
      content: content.trim(),
      imageUrl: imageUrl || '',
      tags: tags || [],
      author: req.user.id,
    });

    await post.populate('author', 'fullName avatarUrl');
    return res.status(201).json({ success: true, post });
  } catch {
    return res.status(500).json({ error: 'Server error creating post.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'newest', tag } = req.query;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 10));
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (tag) {
      filter.tags = tag;
    }

    const sortOptions = { newest: { createdAt: -1 }, oldest: { createdAt: 1 }, popular: { likes: -1 } };
    const sortQuery = sortOptions[sort] || sortOptions.newest;

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate('author', 'fullName avatarUrl')
      .select('-likes')
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNum);

    const postsWithCount = posts.map((p) => {
      const obj = p.toJSON();
      delete obj.likes;
      return obj;
    });

    return res.json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      count: posts.length,
      posts: postsWithCount,
    });
  } catch {
    return res.status(500).json({ error: 'Server error fetching posts.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid post ID.' });

    const post = await Post.findById(req.params.id).populate('author', 'fullName avatarUrl');
    if (!post) return res.status(404).json({ error: 'Post not found.' });

    return res.json({ success: true, post });
  } catch {
    return res.status(500).json({ error: 'Server error fetching post.' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid post ID.' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found.' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorised to update this post.' });

    const { content, imageUrl, tags } = req.body;
    const updates = {};

    if (content !== undefined) {
      if (!content || !content.trim()) return res.status(400).json({ error: 'Post content cannot be empty.' });
      updates.content = content.trim();
    }

    if (imageUrl !== undefined) updates.imageUrl = imageUrl;

    if (tags !== undefined) {
      if (!Array.isArray(tags)) return res.status(400).json({ error: 'tags must be an array of strings.' });
      updates.tags = tags;
    }

    if (Object.keys(updates).length === 0) return res.status(400).json({ error: 'No valid fields provided to update.' });

    const updated = await Post.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true })
      .populate('author', 'fullName avatarUrl');

    return res.json({ success: true, post: updated });
  } catch {
    return res.status(500).json({ error: 'Server error updating post.' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid post ID.' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found.' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorised to delete this post.' });

    await post.deleteOne();
    return res.json({ success: true, message: 'Post deleted.' });
  } catch {
    return res.status(500).json({ error: 'Server error deleting post.' });
  }
});

router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid post ID.' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found.' });

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const hasLiked = post.likes.some((id) => id.equals(userId));

    if (hasLiked) {
      await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: userId } });
      return res.json({ success: true, liked: false, likesCount: post.likes.length - 1 });
    } else {
      await Post.findByIdAndUpdate(req.params.id, { $addToSet: { likes: userId } });
      return res.json({ success: true, liked: true, likesCount: post.likes.length + 1 });
    }
  } catch {
    return res.status(500).json({ error: 'Server error toggling like.' });
  }
});

export default router;

