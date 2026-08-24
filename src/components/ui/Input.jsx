import React from 'react';

const Input = ({
  label,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  error,
  disabled = false,
  className = '',
  ...rest
}) => {
  const inputClasses = `
    w-full rounded-md border border-border bg-white text-text
    placeholder:text-text-secondary/70
    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
    transition-colors duration-200
    ${disabled ? 'bg-gray-50 text-text/50 cursor-not-allowed' : ''}
    px-3 py-2
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-text-secondary font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputClasses}
        {...rest}
      />
      {error && (
        <p className="text-error text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;