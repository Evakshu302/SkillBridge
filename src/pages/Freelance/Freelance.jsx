import React, { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const gigs = [
  {
    id: 1,
    title: 'Build a React dashboard',
    author: 'Priya Sharma',
    skills: ['React', 'Tailwind'],
    budget: '$800',
    proposals: 12,
    days: '3 days ago',
    logo: '📊',
  },
  {
    id: 2,
    title: 'ML model training & tuning',
    author: 'Michael Rodriguez',
    skills: ['Python', 'TensorFlow'],
    budget: '$1,200',
    proposals: 8,
    days: '1 week ago',
    logo: '🤖',
  },
  {
    id: 3,
    title: 'Figma design system',
    author: 'David Kim',
    skills: ['Figma', 'Design Systems'],
    budget: '$600',
    proposals: 15,
    days: '2 days ago',
    logo: '🎨',
  },
  {
    id: 4,
    title: 'AWS infra setup',
    author: 'Sarah Chen',
    skills: ['AWS', 'Terraform'],
    budget: '$1,500',
    proposals: 6,
    days: '5 days ago',
    logo: '☁️',
  },
  {
    id: 5,
    title: 'Mobile app with React Native',
    author: 'Arjun Patel',
    skills: ['React Native', 'Firebase'],
    budget: '$1,000',
    proposals: 11,
    days: '1 week ago',
    logo: '📱',
  },
  {
    id: 6,
    title: 'SEO audit & strategy',
    author: 'Emma Wilson',
    skills: ['SEO', 'Analytics'],
    budget: '$350',
    proposals: 9,
    days: '4 days ago',
    logo: '🔍',
  },
];

const Freelance = () => {
  const [posted, setPosted] = useState(false);
  const [form, setForm] = useState({ title: '', budget: '', skills: '' });

  const handlePost = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setPosted(true);
    setForm({ title: '', budget: '', skills: '' });
    setTimeout(() => setPosted(false), 4000);
  };

  return (
    <>
      <PageHeader
        title="Freelance Board"
        subtitle="Take on projects, build your reputation, and earn while learning. Propose on gigs that match your skills."
        action={
          <Button variant="brand" size="lg" leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }>
            Post a Gig
          </Button>
        }
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Post a Gig form */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Post a Gig</h2>
                <p className="text-sm text-gray-500 mb-6">Offer your skills to the community.</p>
                {posted && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs font-medium text-green-800">Gig posted!</span>
                  </div>
                )}
                <form onSubmit={handlePost} className="space-y-4">
                  <Input
                    label="Gig Title"
                    placeholder="e.g. Build a React dashboard"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                  <Input
                    label="Budget (USD)"
                    placeholder="e.g. $800"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="React, Node.js, PostgreSQL"
                      value={form.skills}
                      onChange={(e) => setForm({ ...form, skills: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <Button type="submit" variant="brand" size="lg" className="w-full">
                    Publish Gig
                  </Button>
                </form>
              </Card>
            </div>

            {/* Gigs list */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {gigs.map((gig) => (
                  <Card key={gig.id} className="group hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl">
                          {gig.logo}
                        </div>
                        <Badge variant="skill" size="small">
                          {gig.days}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{gig.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">by {gig.author}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {gig.skills.map((skill) => (
                          <Badge key={skill} variant="skill" size="small">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                        <div>
                          <p className="text-lg font-bold text-orange-600">{gig.budget}</p>
                          <p className="text-xs text-gray-500">{gig.proposals} proposals</p>
                        </div>
                        <Button variant="brand" size="sm">
                          Propose
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Freelance;