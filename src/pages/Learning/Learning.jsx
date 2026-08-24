import React from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const learningPaths = [
  {
    title: 'Full-Stack Web Development',
    hours: '120 hrs',
    courses: '12',
    level: 'Beginner → Advanced',
    progress: 0,
    color: 'bg-orange-500',
    description: 'Master React, Node.js, databases, and cloud deployment from scratch to job-ready.',
  },
  {
    title: 'Data Science & Machine Learning',
    hours: '140 hrs',
    courses: '14',
    level: 'Beginner → Advanced',
    progress: 35,
    color: 'bg-blue-500',
    description: 'Python, statistics, and ML models — from fundamentals to production deployment.',
  },
  {
    title: 'UI/UX Design Mastery',
    hours: '90 hrs',
    courses: '9',
    level: 'Beginner → Intermediate',
    progress: 60,
    color: 'bg-purple-500',
    description: 'Research, wireframing, prototyping, and testing with Figma.',
  },
  {
    title: 'Cloud & DevOps Engineering',
    hours: '110 hrs',
    courses: '10',
    level: 'Intermediate → Advanced',
    progress: 0,
    color: 'bg-cyan-500',
    description: 'AWS, Docker, Kubernetes, CI/CD, and infrastructure as code.',
  },
  {
    title: 'Digital Marketing',
    hours: '70 hrs',
    courses: '8',
    level: 'Beginner → Intermediate',
    progress: 0,
    color: 'bg-green-500',
    description: 'SEO, SEM, content strategy, and analytics.',
  },
  {
    title: 'Cybersecurity Fundamentals',
    hours: '100 hrs',
    courses: '11',
    level: 'Intermediate → Advanced',
    progress: 0,
    color: 'bg-red-500',
    description: 'Network security, threat modeling, and compliance.',
  },
];

const Learning = () => (
  <>
    <PageHeader
      title="Learning Paths"
      subtitle="Structured, project-based courses designed to take you from beginner to confident."
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

    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path, index) => (
            <Card key={index} className="group hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${path.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                    {path.title[0]}
                  </div>
                  <Badge variant="skill" size="small">
                    {path.level}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{path.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{path.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span>📚 {path.courses} courses</span>
                  <span>⏱️ {path.hours}</span>
                </div>
                {path.progress > 0 ? (
                  <>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-500">{path.progress}% complete</span>
                      <span className="text-xs font-medium text-orange-600">Continue →</span>
                    </div>
                  </>
                ) : (
                  <div className="mb-4">
                    <span className="text-xs text-gray-500">Not started</span>
                  </div>
                )}
                <div className="mt-auto">
                  {path.progress > 0 ? (
                    <Button variant="brand" size="sm" className="w-full">
                      Continue Learning
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-orange-50 group-hover:border-orange-300">
                      Start Path
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

export default Learning;