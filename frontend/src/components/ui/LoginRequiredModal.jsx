import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Lock, LogIn, UserPlus, X } from 'lucide-react';

export const LoginRequiredModal = ({ isOpen, onClose, targetPath = '/products' }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate('/login', { state: { from: targetPath } });
  };

  const handleRegister = () => {
    onClose();
    navigate('/register', { state: { from: targetPath } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-pure-white rounded-3xl border border-hairline-mist shadow-xl max-w-md w-full p-6 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-gray hover:text-ink-black rounded-full hover:bg-sandstone/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 pt-2">
          <div className="w-14 h-14 rounded-full bg-[#e8f7df] text-[#2a6809] border-2 border-[#c4ebae] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-ink-black tracking-tight">Authentication Required</h2>
          <p className="text-xs text-stone-gray font-medium leading-relaxed max-w-xs mx-auto">
            Please login or create an account to view technical product specifications and configure your equipment rental.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            variant="primary"
            className="w-full justify-center text-sm font-bold"
            icon={LogIn}
            onClick={handleLogin}
          >
            Login to Account
          </Button>

          <Button
            variant="outline"
            className="w-full justify-center text-sm font-bold"
            icon={UserPlus}
            onClick={handleRegister}
          >
            Create New Account
          </Button>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-center text-xs font-bold text-stone-gray hover:text-ink-black transition-colors"
          >
            Continue Browsing Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
