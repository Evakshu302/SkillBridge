import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100,
      default: '',
    },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'remote'],
      default: 'full-time',
    },
    salaryMin: {
      type: Number,
      min: 0,
      default: null,
    },
    salaryMax: {
      type: Number,
      min: 0,
      default: null,
    },
    skillsRequired: {
      type: [String],
      default: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applications: {
      type: [applicationSchema],
      default: [],
    },
  },
  { timestamps: true }
);

jobSchema.index({ title: 'text', description: 'text', company: 'text' });

export default mongoose.model('Job', jobSchema);

