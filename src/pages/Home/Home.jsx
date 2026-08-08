import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const skills = [
  {
    icon: (
      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    title: 'Digital Marketing',
    description: 'Master digital strategies, SEO, SEM, and analytics. Hands-on campaign experience with real tools.',
    tags: ['SEO', 'SEM', 'Analytics']
  },
  {
    icon: (
      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Web Development',
    description: 'Build modern web apps with React, Node.js, and databases. Full-stack projects for your portfolio.',
    tags: ['React', 'Node.js', 'SQL']
  },
  {
    icon: (
      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Data Analysis',
    description: 'Learn Python, SQL, and visualization tools. Turn raw data into actionable business insights.',
    tags: ['Python', 'SQL', 'Tableau']
  },
  {
    icon: (
      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'UI/UX Design',
    description: 'Design user-centered interfaces with Figma. Research, wireframe, prototype, and test.',
    tags: ['Figma', 'Research', 'Prototyping']
  }
];

const Home = () => {
  return (
    <>
      <Hero />
      <Features />

      {/* Skills/Opportunities Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Discover Skills and Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore curated learning paths and job opportunities tailored to your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={index}
                title={skill.title}
                description={skill.description}
                className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                  {skill.icon}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-orange-50 text-orange-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Explore
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="bg-linear-to-br from-white to-orange-50/70 border border-orange-100 rounded-2xl p-8 sm:p-12 lg:p-16 text-center shadow-sm">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands of learners building skills, finding opportunities, and connecting with mentors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="brand"
                className="h-12 px-8 font-semibold rounded-lg hover:opacity-90 hover:shadow-md transition-all min-w-[160px]"
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 font-semibold rounded-lg hover:bg-gray-50 hover:shadow-md transition-all min-w-[160px]"
              >
                Explore Skills
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;