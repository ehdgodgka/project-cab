import React from 'react';
import './Card.scss';
const Card = ({ children, className, ...otherProps }) => {
  return (
    <div className={`card ${className}`} {...otherProps}>
      {children}
    </div>
  );
};

export default Card;
