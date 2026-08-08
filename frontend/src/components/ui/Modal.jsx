import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-xl'
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className={`bg-pure-white w-full ${maxWidth} rounded-3xl border border-hairline-mist card-shadow p-6 md:p-8 relative overflow-hidden flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-4 border-b border-hairline-mist/60 shrink-0">
          <div>
            {title && <h3 className="text-xl font-bold text-ink-black">{title}</h3>}
            {subtitle && <p className="text-xs text-stone-gray mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-gray hover:text-ink-black hover:bg-sandstone/40 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 overflow-y-auto grow">
          {children}
        </div>
      </div>
    </div>
  );
};
