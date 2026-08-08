import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // primary | secondary | outline | danger | ghost
  size = 'md', // sm | md | lg
  isLoading = false,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5"
  }[size];

  const variantStyles = {
    primary: "bg-fresh-grass text-ink-black hover:bg-[#7dc74f] focus:ring-fresh-grass font-semibold shadow-sm",
    secondary: "bg-sandstone text-ink-black hover:bg-[#d4cebf] focus:ring-sandstone font-medium",
    outline: "bg-pure-white text-ink-black border border-hairline-mist hover:bg-sandstone/30 focus:ring-hairline-mist",
    danger: "bg-coral-pop text-pure-white hover:bg-[#eb5d4a] focus:ring-coral-pop font-medium",
    ghost: "bg-transparent text-ink-black hover:bg-sandstone/40 focus:ring-stone-gray"
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};
