import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

const sections = [
  {
    title: 'Acceptance of Terms',
    body: 'By accessing or using SkillBridge, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.',
  },
  {
    title: 'Your Account',
    body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You must be at least 16 years old to use the platform.',
  },
  {
    title: 'Content & Conduct',
    body: 'You own the content you post, but grant SkillBridge a license to display and distribute it within the platform. You agree not to post harmful, abusive, or infringing content.',
  },
  {
    title: 'Jobs, Gigs & Projects',
    body: 'SkillBridge is a platform that connects learners with opportunities. We are not a party to agreements between users and do not guarantee outcomes of jobs, gigs, or projects.',
  },
  {
    title: 'Termination',
    body: 'We may suspend or terminate your account if you violate these terms or pose a risk to the community. Upon termination, your access to content may be revoked.',
  },
  {
    title: 'Changes',
    body: 'We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the updated terms.',
  },
];

const Terms = () => (
  <>
    <PageHeader
      title="Terms of Service"
      subtitle="The rules for using SkillBridge — read them before you get started."
    />
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <p className="text-sm text-gray-500">Last updated: August 2026</p>
        {sections.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h2>
            <p className="text-gray-600 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default Terms;