import express from 'express';
import mongoose from 'mongoose';
import Job from '../models/Job.js';
import Category from '../models/Category.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const isValidId = (id) => mongoose.isValidObjectId(id);

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, company, location, type, salaryMin, salaryMax, skillsRequired, category, status } = req.body;

    if (!title || !title.trim()) return res.status(400).json({ error: 'Job title is required.' });
    if (!description || !description.trim()) return res.status(400).json({ error: 'Job description is required.' });
    if (!company || !company.trim()) return res.status(400).json({ error: 'Company name is required.' });

    const validTypes = ['full-time', 'part-time', 'contract', 'remote'];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({ error: `type must be one of: ${validTypes.join(', ')}.` });
    }

    if (skillsRequired !== undefined && !Array.isArray(skillsRequired)) {
      return res.status(400).json({ error: 'skillsRequired must be an array of strings.' });
    }

    if (category && category !== '') {
      if (!isValidId(category)) return res.status(400).json({ error: 'Invalid category ID.' });
      const exists = await Category.findById(category);
      if (!exists) return res.status(400).json({ error: 'Category not found.' });
    }

    if (salaryMin !== undefined && salaryMax !== undefined && salaryMin > salaryMax) {
      return res.status(400).json({ error: 'salaryMin cannot be greater than salaryMax.' });
    }

    const job = await Job.create({
      title: title.trim(),
      description: description.trim(),
      company: company.trim(),
      location: location || '',
      type: type || 'full-time',
      salaryMin: salaryMin ?? null,
      salaryMax: salaryMax ?? null,
      skillsRequired: skillsRequired || [],
      category: category || null,
      status: status || 'open',
      postedBy: req.user.id,
    });

    await job.populate([{ path: 'postedBy', select: 'fullName email' }, 'category']);
    return res.status(201).json({ success: true, job });
  } catch {
    return res.status(500).json({ error: 'Server error creating job.' });
  }
});

router.get('/my/applications', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ 'applications.applicant': req.user.id })
      .select('title company type status applications')
      .populate('category');

    const myApplications = jobs.map((job) => {
      const app = job.applications.find((a) => a.applicant.toString() === req.user.id);
      return {
        job: { id: job._id, title: job.title, company: job.company, type: job.type, status: job.status },
        application: { id: app._id, coverLetter: app.coverLetter, status: app.status, appliedAt: app.createdAt },
      };
    });

    return res.json({ success: true, count: myApplications.length, applications: myApplications });
  } catch {
    return res.status(500).json({ error: 'Server error fetching your applications.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { search, category, type, status, location, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      if (!isValidId(category)) return res.status(400).json({ error: 'Invalid category ID.' });
      filter.category = category;
    }

    const validTypes = ['full-time', 'part-time', 'contract', 'remote'];
    if (type) {
      if (!validTypes.includes(type)) return res.status(400).json({ error: `type must be one of: ${validTypes.join(', ')}.` });
      filter.type = type;
    }

    if (status) {
      if (!['open', 'closed'].includes(status)) return res.status(400).json({ error: 'status must be open or closed.' });
      filter.status = status;
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 10));
    const skip = (pageNum - 1) * limitNum;

    const total = await Job.countDocuments(filter);
    const jobs = await Job.find(filter)
      .select('-applications')
      .populate([{ path: 'postedBy', select: 'fullName email' }, 'category'])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      count: jobs.length,
      jobs,
    });
  } catch {
    return res.status(500).json({ error: 'Server error fetching jobs.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid job ID.' });

    const job = await Job.findById(req.params.id)
      .select('-applications')
      .populate([{ path: 'postedBy', select: 'fullName email' }, 'category']);

    if (!job) return res.status(404).json({ error: 'Job not found.' });

    return res.json({ success: true, job });
  } catch {
    return res.status(500).json({ error: 'Server error fetching job.' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid job ID.' });

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found.' });
    if (job.postedBy.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorised to update this job.' });

    const allowed = ['title', 'description', 'company', 'location', 'type', 'salaryMin', 'salaryMax', 'skillsRequired', 'category', 'status'];
    const updates = {};

    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    if (Object.keys(updates).length === 0) return res.status(400).json({ error: 'No valid fields provided to update.' });

    if (updates.title !== undefined && !updates.title.trim()) return res.status(400).json({ error: 'Job title cannot be empty.' });
    if (updates.description !== undefined && !updates.description.trim()) return res.status(400).json({ error: 'Job description cannot be empty.' });
    if (updates.company !== undefined && !updates.company.trim()) return res.status(400).json({ error: 'Company name cannot be empty.' });

    const validTypes = ['full-time', 'part-time', 'contract', 'remote'];
    if (updates.type && !validTypes.includes(updates.type)) return res.status(400).json({ error: `type must be one of: ${validTypes.join(', ')}.` });
    if (updates.status && !['open', 'closed'].includes(updates.status)) return res.status(400).json({ error: 'status must be open or closed.' });

    if (updates.skillsRequired !== undefined && !Array.isArray(updates.skillsRequired)) {
      return res.status(400).json({ error: 'skillsRequired must be an array of strings.' });
    }

    if (updates.category && updates.category !== '') {
      if (!isValidId(updates.category)) return res.status(400).json({ error: 'Invalid category ID.' });
      const exists = await Category.findById(updates.category);
      if (!exists) return res.status(400).json({ error: 'Category not found.' });
    }

    const minVal = updates.salaryMin ?? job.salaryMin;
    const maxVal = updates.salaryMax ?? job.salaryMax;
    if (minVal !== null && maxVal !== null && minVal > maxVal) {
      return res.status(400).json({ error: 'salaryMin cannot be greater than salaryMax.' });
    }

    if (updates.title) updates.title = updates.title.trim();
    if (updates.description) updates.description = updates.description.trim();
    if (updates.company) updates.company = updates.company.trim();

    const updated = await Job.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true })
      .select('-applications')
      .populate([{ path: 'postedBy', select: 'fullName email' }, 'category']);

    return res.json({ success: true, job: updated });
  } catch {
    return res.status(500).json({ error: 'Server error updating job.' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid job ID.' });

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found.' });
    if (job.postedBy.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorised to delete this job.' });

    await job.deleteOne();
    return res.json({ success: true, message: 'Job deleted.' });
  } catch {
    return res.status(500).json({ error: 'Server error deleting job.' });
  }
});

router.post('/:id/apply', authMiddleware, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid job ID.' });

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found.' });
    if (job.status === 'closed') return res.status(400).json({ error: 'This job is no longer accepting applications.' });

    if (job.postedBy.toString() === req.user.id) {
      return res.status(400).json({ error: 'You cannot apply to your own job.' });
    }

    const alreadyApplied = job.applications.some((a) => a.applicant.toString() === req.user.id);
    if (alreadyApplied) return res.status(400).json({ error: 'You have already applied for this job.' });

    const { coverLetter } = req.body;

    job.applications.push({ applicant: req.user.id, coverLetter: coverLetter || '' });
    await job.save();

    const newApp = job.applications[job.applications.length - 1];
    return res.status(201).json({ success: true, application: { id: newApp._id, status: newApp.status, appliedAt: newApp.createdAt } });
  } catch {
    return res.status(500).json({ error: 'Server error submitting application.' });
  }
});

router.get('/:id/applications', authMiddleware, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid job ID.' });

    const job = await Job.findById(req.params.id).populate({ path: 'applications.applicant', select: 'fullName email avatarUrl' });
    if (!job) return res.status(404).json({ error: 'Job not found.' });
    if (job.postedBy.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorised to view these applications.' });

    return res.json({ success: true, count: job.applications.length, applications: job.applications });
  } catch {
    return res.status(500).json({ error: 'Server error fetching applications.' });
  }
});

router.put('/:id/applications/:appId', authMiddleware, async (req, res) => {
  try {
    if (!isValidId(req.params.id) || !isValidId(req.params.appId)) {
      return res.status(400).json({ error: 'Invalid ID.' });
    }

    const { status } = req.body;
    const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}.` });
    }

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found.' });
    if (job.postedBy.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorised to manage this application.' });

    const application = job.applications.id(req.params.appId);
    if (!application) return res.status(404).json({ error: 'Application not found.' });

    application.status = status;
    await job.save();

    return res.json({ success: true, application });
  } catch {
    return res.status(500).json({ error: 'Server error updating application status.' });
  }
});

export default router;

