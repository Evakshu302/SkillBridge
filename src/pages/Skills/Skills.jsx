import React, { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const skillCategories = [
  {
    name: 'Development',
    skills: ['Web Development', 'Mobile Development', 'Full-Stack', 'DevOps', 'Cloud Computing', 'Game Development'],
  },
  {
    name: 'Data & AI',
    skills: ['Data Science', 'Machine Learning', 'Artificial Intelligence', 'Data Engineering', 'Analytics'],
  },
  {
    name: 'Design',
    skills: ['UI/UX Design', 'Graphic Design', 'Product Design', 'Motion Design', 'Design Systems'],
  },
  {
    name: 'Business',
    skills: ['Digital Marketing', 'Product Management', 'Project Management', 'Finance', 'Entrepreneurship'],
  },
  {
    name: 'Cybersecurity',
    skills: ['Network Security', 'Ethical Hacking', 'Cloud Security', 'Compliance'],
  },
];

const popularSkills = [
  {
    title: 'Full-Stack Development',
    learners: '12.4K',
    rating: 4.8,
    level: 'Intermediate',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    color: 'bg-orange-500',
  },
  {
    title: 'Data Science & ML',
    learners: '9.8K',
    rating: 4.7,
    level: 'Advanced',
    tags: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
    color: 'bg-blue-500',
  },
  {
    title: 'UI/UX Design',
    learners: '8.2K',
    rating: 4.9,
    level: 'Beginner',
    tags: ['Figma', 'Prototyping', 'User Research'],
    color: 'bg-purple-500',
  },
  {
    title: 'Digital Marketing',
    learners: '7.5K',
    rating: 4.6,
    level: 'Beginner',
    tags: ['SEO', 'SEM', 'Analytics', 'Social Media'],
    color: 'bg-green-500',
  },
  {
    title: 'Cloud & DevOps',
    learners: '6.1K',
    rating: 4.7,
    level: 'Advanced',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    color: 'bg-cyan-500',
  },
  {
    title: 'Cybersecurity',
    learners: '5.3K',
    rating: 4.8,
    level: 'Advanced',
    tags: ['Ethical Hacking', 'Network Security', 'Compliance'],
    color: 'bg-red-500',
  },
];

const Skills = () => {
  const [search, setSearch] = useState('');

  const filtered = popularSkills.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <PageHeader
        title="Explore Skills"
        subtitle="Discover the skills that are in demand and start learning them today."
        action={
          <Button variant="brand" size="lg" leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }>
            Browse All Courses
          </Button>
        }
      />

      {/* Search + Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-72 shrink-0">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Categories
              </h3>
              <div className="space-y-4">
                {skillCategories.map((cat) => (
                  <div key={cat.name}>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{cat.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <button
                          key={skill}
                          className="px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-full hover:border-orange-400 hover:text-orange-600 transition-colors"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Skills Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((skill, index) => (
                  <Card key={index} className="group hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 ${skill.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                          {skill.title[0]}
                        </div>
                        <Badge variant="skill" size="small">
                          {skill.level}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{skill.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>⭐ {skill.rating}</span>
                        <span>👥 {skill.learners} learners</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skill.tags.map((tag) => (
                          <Badge key={tag} variant="skill" size="small">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-auto">
                        <Button variant="outline" size="sm" className="w-full group-hover:bg-orange-50 group-hover:border-orange-300">
                          Explore Path
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

export default Skills;