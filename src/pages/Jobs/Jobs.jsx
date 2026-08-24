import React, { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const jobs = [
  {
    id: 1,
    title: 'Frontend Engineer',
    company: 'CloudBase Inc.',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90k - $120k',
    tags: ['React', 'TypeScript', 'Tailwind'],
    logo: '☁️',
    posted: '2 days ago',
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Insight Labs',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$75k - $95k',
    tags: ['Python', 'SQL', 'Tableau'],
    logo: '📊',
    posted: '1 week ago',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Pixel Studio',
    location: 'Remote',
    type: 'Contract',
    salary: '$60/hr',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
    logo: '🎨',
    posted: '3 days ago',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'InfraScale',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110k - $140k',
    tags: ['AWS', 'Docker', 'Kubernetes'],
    logo: '⚙️',
    posted: '5 days ago',
  },
  {
    id: 5,
    title: 'Mobile Developer',
    company: 'AppCraft',
    location: 'Remote',
    type: 'Full-time',
    salary: '$85k - $110k',
    tags: ['React Native', 'Swift', 'Kotlin'],
    logo: '📱',
    posted: '1 week ago',
  },
  {
    id: 6,
    title: 'Product Manager',
    company: 'LaunchPad',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$130k - $170k',
    tags: ['Strategy', 'Analytics', 'Leadership'],
    logo: '🚀',
    posted: '2 weeks ago',
  },
];

const Jobs = () => {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
  });
  const [applied, setApplied] = useState({});

  const handleApply = (id) => {
    setApplied({ ...applied, [id]: true });
    setTimeout(() => {
      setApplied((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 3000);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    return matchesLocation && matchesType;
  });

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

      {/* Filters */}
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
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="group hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl">
                      {job.logo}
                    </div>
                    <Badge variant="skill" size="small">
                      {job.type}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-600 font-medium mb-1">{job.company}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <span>📍 {job.location}</span>
                    <span>•</span>
                    <span>⏰ {job.posted}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="skill" size="small">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <span className="text-sm font-semibold text-orange-600">{job.salary}</span>
                    {applied[job.id] ? (
                      <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Applied
                      </span>
                    ) : (
                      <Button
                        variant="brand"
                        size="sm"
                        onClick={() => handleApply(job.id)}
                      >
                        Apply Now
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;