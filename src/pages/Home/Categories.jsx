import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const categories = [
  {
    icon: '🏗️',
    title: 'Full-Stack Development',
    count: '2,400+ Learners',
    desc: 'Build web and mobile apps with modern frameworks and tools.',
    badge: 'Trending',
  },
  {
    icon: '📊',
    title: 'Data Science & AI',
    count: '1,800+ Learners',
    desc: 'Learn machine learning, analytics, and data engineering.',
    badge: 'Popular',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    count: '1,200+ Learners',
    desc: 'Design user-centered interfaces with Figma and prototyping.',
    badge: 'New',
  },
  {
    icon: '🔒',
    title: 'Cybersecurity',
    count: '900+ Learners',
    desc: 'Secure systems and networks with industry-standard practices.',
    badge: null,
  },
  {
    icon: '🗄️',
    title: 'Cloud & DevOps',
    count: '1,500+ Learners',
    desc: 'Deploy and manage infrastructure on major cloud platforms.',
    badge: null,
  },
  {
    icon: '📱',
    title: 'Mobile Development',
    count: '1,100+ Learners',
    desc: 'Build native and cross-platform mobile experiences.',
    badge: 'Trending',
  },
  {
    icon: '💰',
    title: 'Data Engineering',
    count: '700+ Learners',
    desc: 'Transform raw data into actionable business insights.',
    badge: null,
  },
  {
    icon: '🛠️',
    title: 'Product Design',
    count: '500+ Learners',
    desc: 'Product strategy, research, and user research methods.',
    badge: 'Popular',
  },
  {
    icon: '🎮',
    title: 'Game Development',
    count: '350+ Learners',
    desc: 'Create 2D and 3D games with Unity and Unreal.',
    badge: null,
  },
];

const Categories = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
          Explore Categories
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          Each path offers hands-on projects, mentorship, and real-world
          experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, index) => (
            <Card
              key={index}
              className="group hover:border-orange-200 hover:shadow-md transition-all duration-300"
              title={cat.title}
              description={cat.desc}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex items-center gap-2">
                  {cat.badge && (
                    <Badge variant="primary" size="small">
                      {cat.badge}
                    </Badge>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-500">{cat.count}</span>
              <div className="flex gap-2 mt-3">
                <Badge variant="outline" size="small">
                  Learn
                </Badge>
                <Badge variant="outline" size="small">
                  Apply
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
