import React from 'react';

export const RupeeIcon = ({ className = 'w-5 h-5', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="M6 13h5a4 4 0 0 0 0-8" />
    <path d="M6 13l9 8" />
  </svg>
);

export default RupeeIcon;
