import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'md', // sm | md | lg | none
  variant = 'white', // white | sandstone | outline
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }[padding];

  const variantStyles = {
    white: 'bg-pure-white border border-hairline-mist/70',
    sandstone: 'bg-sandstone/40 border border-sandstone',
    outline: 'bg-transparent border border-hairline-mist'
  }[variant];

  const hoverStyles = hover ? 'card-hover cursor-pointer' : '';

  return (
    <div
      className={`rounded-3xl card-shadow ${variantStyles} ${paddingStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
