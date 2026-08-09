import React from 'react';

const companies = [
  { name: 'Google', desc: 'Innovating the world, one search at a time' },
  { name: 'Microsoft', desc: 'Empowering every person and every organization' },
  { name: 'Meta', desc: 'Building the connected experience of the future' },
  { name: 'Amazon', desc: 'Leading through innovation and customer focus' },
  { name: 'IBM', desc: 'Advancing technology for global impact' },
];

const TrustedBy = () => {
  const cardClasses = 'bg-surface border border-gray-200 rounded-xl p-4 text-center hover:border-gray-300 transition-colors';

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
          Trusted By
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Leading companies and organizations worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {companies.map((company, index) => (
            <div
              key={index}
              className={`${cardClasses} flex flex-col items-center justify-center min-h-[120px] w-full max-w-sm sm:w-[min(100%,calc(50%-0.5rem))] lg:w-[min(100%,11rem)] lg:flex-[1_1_11rem] lg:max-w-[13rem]`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-3">
                <span className="text-orange-600 font-bold text-sm">
                  {company.name[0]}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-medium">{company.name}</p>
              <p className="text-xs text-gray-500 mt-1">{company.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
