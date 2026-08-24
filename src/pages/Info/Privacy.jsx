import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect information you provide directly to us, such as your name, email address, and profile details when you create an account or post content. We also collect usage data — pages visited, time spent, and features used — to improve the platform.',
  },
  {
    title: 'How We Use Your Information',
    body: 'Your data is used to provide, personalize, and improve SkillBridge — delivering course recommendations, surfacing relevant jobs, and powering mentor connections. We may use aggregated, anonymized data for research and platform improvements.',
  },
  {
    title: 'Sharing & Disclosure',
    body: 'We do not sell your personal information. We may share data with service providers who help operate the platform (hosting, analytics, payments), and with mentors or employers when you choose to share your profile or apply to opportunities.',
  },
  {
    title: 'Your Choices',
    body: 'You can control your profile visibility, manage communication preferences, and request deletion of your account and personal data at any time by contacting us. Some data may be retained for legal or platform-safety reasons.',
  },
  {
    title: 'Security',
    body: 'We use industry-standard security measures to protect your information, including encryption in transit and at rest. However, no online service is completely secure, and we continuously work to strengthen our protections.',
  },
];

const Privacy = () => (
  <>
    <PageHeader
      title="Privacy Policy"
      subtitle="How SkillBridge collects, uses, and protects your information."
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

export default Privacy;