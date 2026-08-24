import React from 'react';
import Button from '../ui/Button';

const PageHeader = ({ title, subtitle, action, badge, icon }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-start gap-4">
            {icon && (
              <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-orange-600">{icon}</span>
              </div>
            )}
            <div>
              {badge && (
                <span className="inline-block text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full mb-2 uppercase tracking-wide">
                  {badge}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-lg text-gray-600 max-w-2xl">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;