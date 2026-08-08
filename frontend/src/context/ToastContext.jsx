import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Render Portal Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
        {toasts.map(toast => {
          const typeStyles = {
            success: 'bg-pure-white text-ink-black border-fresh-grass/80 shadow-lg',
            error: 'bg-pure-white text-ink-black border-coral-pop/80 shadow-lg',
            warning: 'bg-pure-white text-ink-black border-sunshine-pop/80 shadow-lg',
            info: 'bg-pure-white text-ink-black border-sky-pop/80 shadow-lg'
          }[toast.type] || 'bg-pure-white text-ink-black border-hairline-mist';

          const IconComponent = {
            success: CheckCircle2,
            error: XCircle,
            warning: AlertCircle,
            info: Info
          }[toast.type] || Info;

          const iconColor = {
            success: 'text-fresh-grass',
            error: 'text-coral-pop',
            warning: 'text-amber-500',
            info: 'text-sky-pop'
          }[toast.type];

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 transform translate-y-0 ${typeStyles}`}
            >
              <div className="flex items-start gap-3">
                <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
                <span className="text-sm font-medium text-ink-black">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-stone-gray hover:text-ink-black ml-4 p-1 rounded-full hover:bg-sandstone/40 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
