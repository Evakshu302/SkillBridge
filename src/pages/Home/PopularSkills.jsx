import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const popularSkills = [
  {
    title: 'Full-Stack Developer',
    description: 'React, Node.js, PostgreSQL with cloud deployment experience',
    difficulty: 'Intermediate',
    popularity: 'Most Popular',
    skills: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Data Scientist',
    description: 'Python, pandas, scikit-learn, statistical analysis and ML',
    difficulty: 'Advanced',
    popularity: 'High Growth',
    skills: ['Python', 'ML', 'Statistics'],
  },
  {
    title: 'UI/UX Designer',
    description: 'Figma, wireframing, prototyping, user testing and design systems',
    difficulty: 'Beginner',
    popularity: 'Popular',
    skills: ['Figma', 'Design Systems'],
  },
  {
    title: 'DevOps Engineer',
    description: 'Docker, Kubernetes, CI/CD pipelines and cloud infrastructure',
    difficulty: 'Advanced',
    popularity: 'High Growth',
    skills: ['Docker', 'Kubernetes', 'AWS'],
  },
  {
    title: 'Mobile Developer',
    description: 'React Native, Swift, Kotlin for iOS and Android apps',
    difficulty: 'Intermediate',
    popularity: 'Popular',
    skills: ['React Native', 'iOS', 'Android'],
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Network security, threat analysis, compliance and risk management',
    difficulty: 'Advanced',
    popularity: 'Growing',
    skills: ['Security', 'Linux', 'Networking'],
  },
  {
    title: 'Cloud Solutions Architect',
    description: 'AWS, Azure, GCP design and implementation for enterprise clients',
    difficulty: 'Advanced',
    popularity: 'Most Popular',
    skills: ['AWS', 'Azure', 'GCP'],
  },
  {
    title: 'Product Manager',
    description: 'Product roadmap, user research, strategy, and market analysis',
    difficulty: 'Intermediate',
    popularity: 'In-Demand',
    skills: ['Strategy', 'Analytics', 'Leadership'],
  },
];

const PopularSkills = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
          Popular Skills
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          Trending skills that employers are actively seeking in 2026
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {popularSkills.map((skill, index) => (
            <Card
              key={index}
              className="group hover:border-orange-200 hover:shadow-md transition-all duration-300 h-full"
            >
              <div className="flex flex-col h-full">
                <div className="mb-3">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {skill.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {skill.skills.map((s, i) => (
                    <Badge key={i} variant="outline" size="small">
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {skill.difficulty}
                  </span>
                  <Badge variant="primary" size="small">
                    {skill.popularity}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSkills;