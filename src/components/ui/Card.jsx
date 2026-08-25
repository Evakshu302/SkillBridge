import React from 'react';

const Card = ({ title, description, image, children, className, ...rest }) => {
  const baseClasses = `
    bg-white border border-gray-200
    rounded-lg
    shadow-md
    hover:-translate-y-1 hover:shadow-lg
    transition-transform duration-200
    transition-shadow duration-200
    w-full
    max-w-full
  `;

  const classes = [baseClasses, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {image && (
        <img
          src={image}
          alt=""
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        {title && <h3 className="text-text font-semibold">{title}</h3>}
        {description && <p className="text-text-secondary">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;