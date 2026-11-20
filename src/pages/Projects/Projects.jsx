import { useState, useEffect } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/useAuth';
import { get, post } from '../../utils/api';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    githubUrl: '',
    liveUrl: '',
  });

  useEffect(() => {
    let ignore = false;
    const loadProjects = async () => {
      try {
        const data = await get('/projects');
        if (!ignore) {
          setProjects(Array.isArray(data.projects) ? data.projects : (Array.isArray(data) ? data : []));
        }
      } catch {
        if (!ignore) setProjects([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    loadProjects();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setSubmitError('You must be logged in to submit a project.');
      return;
    }
    if (!formData.title.trim()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const result = await post('/projects', {
        title: formData.title,
        description: formData.description,
        technologies: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
        githubUrl: formData.githubUrl,
        liveUrl: formData.liveUrl,
      });
      if (result.project) {
        setProjects((prev) => [result.project, ...prev]);
      }
      setFormData({ title: '', description: '', skills: '', githubUrl: '', liveUrl: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit project.');
    } finally {
      setSubmitting(false);
    }
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
                <span className="text-sm font-medium text-green-800">Project submitted successfully!</span>
              </div>
            )}
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{submitError}</div>
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
                label="GitHub URL"
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills Used</label>
                <input
                  type="text"
                  placeholder="React, Node.js, PostgreSQL (comma separated)"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" variant="brand" size="lg" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Projects</h2>
          {loading ? (
            <div className="text-center py-16 text-gray-400 text-sm">Loading projects…</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">No projects yet. Be the first to share one!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const techList = Array.isArray(project.technologies) ? project.technologies : [];
                const author = project.owner?.fullName ?? 'Unknown';
                return (
                  <Card key={project._id} className="group hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-2xl font-bold text-orange-500">
                          {project.title?.[0] ?? 'P'}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                              GitHub ↗
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                              Live ↗
                            </a>
                          )}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
                      <p className="text-sm text-gray-500 mb-1">by {author}</p>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                      {techList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {techList.map((skill) => (
                            <Badge key={skill} variant="skill" size="small">{skill}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;
