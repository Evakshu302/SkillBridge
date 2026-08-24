import React from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const portfolioItems = [
  {
    title: 'E-Commerce Dashboard',
    skills: ['React', 'Node.js', 'PostgreSQL'],
    image: '🛒',
    description: 'Full-stack admin dashboard with real-time analytics and order management.',
  },
  {
    title: 'ML Sentiment Analyzer',
    skills: ['Python', 'TensorFlow', 'NLP'],
    image: '🤖',
    description: 'BERT-based classifier reaching 94% accuracy on customer reviews.',
  },
  {
    title: 'Design System Kit',
    skills: ['Figma', 'Design Systems'],
    image: '🎨',
    description: 'Accessible component library with dark mode and theming.',
  },
  {
    title: 'TaskFlow App',
    skills: ['React Native', 'Firebase'],
    image: '📱',
    description: 'Cross-platform productivity app with offline sync and push notifications.',
  },
  {
    title: 'Cloud Cost Optimizer',
    skills: ['AWS', 'Terraform', 'Python'],
    image: '☁️',
    description: 'Automated AWS spend analysis and right-sizing recommendations.',
  },
  {
    title: 'Portfolio Website',
    skills: ['HTML/CSS', 'JavaScript', 'Vite'],
    image: '💼',
    description: 'Responsive animated personal portfolio with smooth scroll and dark mode.',
  },
];

const Portfolio = () => (
  <>
    <PageHeader
      title="Portfolio Gallery"
      subtitle="Showcase the work you\'ve built. A strong portfolio opens doors to mentorship, jobs, and collaboration."
      action={
        <Button variant="brand" size="lg" leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }>
          Add to Portfolio
        </Button>
      }
    />

    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <Card key={index} className="group hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="flex-1">
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-3xl mb-4">
                  {item.image}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.skills.map((skill) => (
                    <Badge key={skill} variant="skill" size="small">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                <Button variant="ghost" size="sm" className="flex-1">Share</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Portfolio;