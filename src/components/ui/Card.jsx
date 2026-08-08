import React from 'react';

const Card = ({ title, description, image, children, className, ...rest }) => {
  const baseClasses = `
    bg-surface
    border border-border
    rounded-lg
    shadow-md
    hover:-translate-y-1 hover:shadow-lg
    transition-transform duration-200
    transition-shadow duration-200
    w-full
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
      <div className="p-4 space-y-3">
        <h3 className="text-text font-semibold">{title}</h3>
        <p className="text-text-secondary">{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;