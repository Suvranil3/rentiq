import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Input = ({
  label,
  helperText,
  error,
  type = 'text',
  className = '',
  id,
  options, // for select type
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const inputBaseStyles = "w-full px-4 py-3 bg-pure-white border border-hairline-mist rounded-xl text-ink-black placeholder:text-stone-gray/60 focus:outline-none focus:ring-2 focus:ring-fresh-grass focus:border-transparent transition-all duration-200 text-sm";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-ink-black tracking-wide">
          {label}
        </label>
      )}
      
      {type === 'select' ? (
        <select
          id={inputId}
          className={`${inputBaseStyles} cursor-pointer ${error ? 'border-coral-pop focus:ring-coral-pop' : ''} ${className}`}
          {...props}
        >
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={inputId}
          className={`${inputBaseStyles} min-h-[100px] resize-y ${error ? 'border-coral-pop focus:ring-coral-pop' : ''} ${className}`}
          {...props}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          className={`${inputBaseStyles} ${error ? 'border-coral-pop focus:ring-coral-pop' : ''} ${className}`}
          {...props}
        />
      )}

      {error ? (
        <div className="flex items-center gap-1 text-coral-pop text-xs mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <span className="text-xs text-stone-gray mt-0.5">{helperText}</span>
      ) : null}
    </div>
  );
};
