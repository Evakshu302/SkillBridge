import React, { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Dashboard',
    author: 'Priya Sharma',
    skills: ['React', 'Node.js', 'PostgreSQL'],
    stars: 128,
    likes: 456,
    image: '🛒',
    description: 'A full-stack e-commerce admin dashboard with real-time analytics and order management.',
  },
  {
    id: 2,
    title: 'ML Sentiment Analyzer',
    author: 'Michael Rodriguez',
    skills: ['Python', 'TensorFlow', 'NLP'],
    stars: 243,
    likes: 712,
    image: '🤖',
    description: 'A sentiment analysis tool that classifies customer reviews using a fine-tuned BERT model.',
  },
  {
    id: 3,
    title: 'Design System Kit',
    author: 'David Kim',
    skills: ['Figma', 'Design Systems', 'Prototyping'],
    stars: 89,
    likes: 321,
    image: '🎨',
    description: 'A complete, accessible component library with dark mode and theming support.',
  },
  {
    id: 4,
    title: 'TaskFlow App',
    author: 'Sarah Chen',
    skills: ['React Native', 'Firebase', 'Redux'],
    stars: 156,
    likes: 534,
    image: '📱',
    description: 'A cross-platform productivity app with offline sync and push notifications.',
  },
  {
    id: 5,
    title: 'Cloud Cost Optimizer',
    author: 'Arjun Patel',
    skills: ['AWS', 'Terraform', 'Python'],
    stars: 67,
    likes: 198,
    image: '☁️',
    description: 'An automated tool that analyzes AWS spend and recommends right-sizing opportunities.',
  },
  {
    id: 6,
    title: 'Portfolio Website',
    author: 'Emma Wilson',
    skills: ['HTML/CSS', 'JavaScript', 'Vite'],
    stars: 34,
    likes: 142,
    image: '💼',
    description: 'A responsive, animated personal portfolio with smooth scroll and dark mode.',
  },
];

const Projects = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    author: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) return;
    setSubmitted(true);
    setFormData({ title: '', description: '', skills: '', author: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="Explore real-world projects built by the SkillBridge community. Share your own and get feedback."
        action={
          <Button variant="brand" size="lg" leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }>
            Submit a Project
          </Button>
        }
      />

      {/* Submit Form */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Share Your Project</h2>
            <p className="text-sm text-gray-500 mb-6">Get visibility, feedback, and collaboration from the community.</p>
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-green-800">
                  Thank you! Your project has been submitted for review.
                </span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Project Title"
                placeholder="e.g. My Awesome App"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                label="Your Name"
                placeholder="Jane Doe"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
              <div className="md:col-span-2">
                <Input
                  label="Description"
                  placeholder="Tell us what your project does and how you built it."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Skills Used
                </label>
                <input
                  type="text"
                  placeholder="React, Node.js, PostgreSQL (comma separated)"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" variant="brand" size="lg">
                  Submit Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="group hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-3xl">
                      {project.image}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">⭐ {project.stars}</span>
                      <span className="flex items-center gap-1">❤️ {project.likes}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">by {project.author}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="skill" size="small">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    ⭐ Star
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;