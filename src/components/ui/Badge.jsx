import React from 'react';

const Badge = ({ variant = 'primary', size = 'medium', children, className }) => {
  const sizeClass = size === 'small' ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-base';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    error: 'bg-red-600 text-white hover:bg-red-700',
    neutral: 'bg-gray-700 text-white hover:bg-gray-800',
    outline:
      'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400',
  };

  const classes = [
    'inline-flex items-center rounded-full text-sm font-medium transition-colors duration-200',
    sizeClass,
    variantClasses[variant] ?? variantClasses.primary,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
};

export default Badge;
