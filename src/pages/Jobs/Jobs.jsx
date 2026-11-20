import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/useAuth';
import { get, post } from '../../utils/api';

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return '1 week ago';
  return `${Math.floor(days / 7)} weeks ago`;
};

const Jobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ location: '', type: '' });
  const [applied, setApplied] = useState({});
  const [applying, setApplying] = useState({});

  useEffect(() => {
    let ignore = false;
    const fetchJobsData = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.location) params.set('location', filters.location);
        if (filters.type) params.set('type', filters.type);
        const query = params.toString() ? `?${params.toString()}` : '';
        const data = await get(`/jobs${query}`);
        if (!ignore) {
          setJobs(Array.isArray(data.jobs) ? data.jobs : (Array.isArray(data) ? data : []));
        }
      } catch {
        if (!ignore) setJobs([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchJobsData();
    return () => {
      ignore = true;
    };
  }, [filters]);

  const handleApply = async (jobId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setApplying((prev) => ({ ...prev, [jobId]: true }));
    try {
      await post(`/jobs/${jobId}/apply`, { coverLetter: '' });
      setApplied((prev) => ({ ...prev, [jobId]: true }));
    } catch {
      setApplied((prev) => ({ ...prev, [jobId]: 'error' }));
      setTimeout(() => setApplied((prev) => { const n = { ...prev }; delete n[jobId]; return n; }), 3000);
    } finally {
      setApplying((prev) => { const n = { ...prev }; delete n[jobId]; return n; });
    }
  };

  return (
    <>
      <PageHeader
        title="Find Your Next Opportunity"
        subtitle="Browse curated jobs, internships, and freelance projects matched to your skills."
        action={
          <Button variant="brand" size="lg" leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }>
            Post a Job
          </Button>
        }
      />

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                label=""
                placeholder="Search by location..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
            <div className="sm:w-48">
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All types</option>
                <option value="full-time">Full-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="part-time">Part-time</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-gray-400 text-sm">Loading jobs…</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">No jobs found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job) => (
                <Card key={job._id} className="group hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-xl font-bold text-orange-500">
                        {job.company?.[0] ?? '?'}
                      </div>
                      <Badge variant="skill" size="small">{job.type}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-sm text-gray-600 font-medium mb-1">{job.company}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <span>📍 {job.location}</span>
                      <span>•</span>
                      <span>⏰ {timeAgo(job.createdAt)}</span>
                    </div>
                    {job.skillsRequired?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skillsRequired.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="skill" size="small">{tag}</Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <span className="text-sm font-semibold text-orange-600">
                        {job.salary || 'Salary not listed'}
                      </span>
                      {applied[job._id] === true ? (
                        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Applied
                        </span>
                      ) : applied[job._id] === 'error' ? (
                        <span className="text-sm text-red-500">Already applied</span>
                      ) : (
                        <Button
                          variant="brand"
                          size="sm"
                          onClick={() => handleApply(job._id)}
                          disabled={!!applying[job._id]}
                        >
                          {applying[job._id] ? '…' : 'Apply Now'}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Jobs;
