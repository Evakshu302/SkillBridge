import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';


const mentors = [
  {
    id: 1,
    name: 'Sarah Chen',
    avatar: 'S',
    expertise: 'Full-Stack Developer, AWS Architect',
    bio: 'Building scalable web applications with React, Node.js, and AWS for 8+ years. Passionate about mentoring developers and helping them build production-ready apps.',
    rating: 4.9,
    students: 2847,
    badge: 'Verified Mentor',
    specialty: 'Cloud Architecture',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    avatar: 'M',
    expertise: 'Data Scientist, ML Engineer',
    bio: 'Specializes in machine learning, Python, and data visualization. Former Google data scientist with expertise in analytics dashboards and predictive modeling.',
    rating: 4.8,
    students: 1923,
    badge: 'Featured Expert',
    specialty: 'Machine Learning',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    avatar: 'P',
    expertise: 'UI/UX Designer, Product Design',
    bio: 'Lead designer at startup with 6+ years creating user-centered interfaces. Expert in Figma, user research, and design systems.',
    rating: 4.9,
    students: 1456,
    badge: 'Top Rated',
    specialty: 'UX Research',
  },
  {
    id: 4,
    name: 'David Kim',
    avatar: 'D',
    expertise: 'DevOps Engineer, Cloud Security',
    bio: 'Kubernetes expert with deep experience in CI/CD pipelines and cloud security protocols. Helps teams deploy with confidence and security.',
    rating: 4.7,
    students: 1654,
    badge: 'Security Specialist',
    specialty: 'DevOps',
  },
];

const TopMentors = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
          Top Mentors
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          Experienced professionals ready to guide your learning journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="group hover:border-orange-200 hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <span className="text-white font-bold text-lg">{mentor.avatar}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-900">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {mentor.expertise}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {mentor.bio}
                </p>
                <div className="mt-auto pt-3">
                  <Badge variant="primary" size="small" className="mb-3 block w-max">
                    {mentor.badge}
                  </Badge>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>⭐ {mentor.rating}</span>
                    <span>👥 {mentor.students} students</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopMentors;