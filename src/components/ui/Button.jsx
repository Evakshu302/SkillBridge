import React from 'react';

const Button = ({
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}) => {
  const sizeClass =
    size === 'xs'
      ? 'px-2.5 py-1 text-xs'
      : size === 'sm'
        ? 'px-3 py-1.5 text-sm'
        : size === 'medium'
          ? 'px-4 py-2 text-base'
          : size === 'lg'
            ? 'px-5 py-3 text-lg'
            : 'px-6 py-3 text-lg';

  const baseClasses = [
    'inline-flex items-center justify-center gap-2 font-medium leading-normal',
    'rounded-lg transition-all duration-200 ease-in-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
  ].join(' ');

  const variantClass =
    variant === 'primary'
      ? 'bg-orange-500 text-white hover:bg-orange-600 active:-translate-y-0.5 shadow-md hover:shadow-lg focus-visible:ring-orange-500'
      : variant === 'secondary'
        ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:-translate-y-0.5 shadow-sm hover:shadow focus-visible:ring-gray-400'
        : variant === 'brand'
          ? 'bg-orange-500 text-white hover:bg-orange-600 active:-translate-y-0.5 shadow-md hover:shadow-lg focus-visible:ring-orange-500 focus-visible:ring-offset-2'
          : variant === 'outline'
            ? 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 active:-translate-y-0.5 shadow-sm hover:shadow focus-visible:ring-gray-400'
            : variant === 'ghost'
              ? 'text-gray-700 bg-transparent hover:bg-gray-100 active:-translate-y-0.5 focus-visible:ring-gray-400'
              : 'bg-orange-500 text-white hover:bg-orange-600 active:-translate-y-0.5 shadow-md hover:shadow-lg focus-visible:ring-orange-500 focus-visible:ring-offset-2';

  const classes = [baseClasses, sizeClass, variantClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...props}>
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;