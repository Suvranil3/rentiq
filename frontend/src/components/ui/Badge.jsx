import React from 'react';

export const Badge = ({
  status = 'Available',
  children,
  size = 'md', // sm | md
  className = ''
}) => {
  const normalized = (children || status).toString().toUpperCase();

  let badgeStyle = "bg-sandstone/60 text-ink-black border-hairline-mist";
  let dotStyle = "bg-stone-gray";

  if (['AVAILABLE', 'ACTIVE', 'PAID', 'REFUNDED', 'RETURNED', 'CONFIRMED'].includes(normalized)) {
    badgeStyle = "bg-[#e8f7df] text-[#2a6809] border-[#c4ebae]";
    dotStyle = "bg-fresh-grass";
  } else if (['DUE SOON', 'PENDING', 'HELD', 'PROCESSING'].includes(normalized)) {
    badgeStyle = "bg-[#fef9d7] text-[#786000] border-[#f9ee9d]";
    dotStyle = "bg-sunshine-pop";
  } else if (['OVERDUE', 'DAMAGED', 'UNAVAILABLE', 'OUT OF STOCK', 'ALL DISTRIBUTED', 'RENTED OUT', 'FAILED', 'CANCELLED', 'FULLY_DEDUCTED', 'CRITICAL'].some(k => normalized.includes(k))) {
    badgeStyle = "bg-[#ffe8e5] text-[#9e1d0d] border-[#ffc2bb]";
    dotStyle = "bg-coral-pop";
  } else if (['UPCOMING', 'SHIPPED', 'PARTIALLY_DEDUCTED', 'AI PREDICTION'].includes(normalized)) {
    badgeStyle = "bg-[#e6f4ff] text-[#00509d] border-[#b5e0ff]";
    dotStyle = "bg-sky-pop";
  }

  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-[10px] gap-1' : 'px-2.5 py-1 text-xs gap-1.5';

  return (
    <span className={`inline-flex items-center font-semibold rounded-lg border ${badgeStyle} ${sizeStyles} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotStyle}`} />
      <span>{children || status}</span>
    </span>
  );
};
