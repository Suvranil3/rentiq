import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Shield, User, ArrowLeft } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsDemoUser, loading } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = (typeof location.state?.from === 'string' ? location.state.from : location.state?.from?.pathname) || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const loggedUser = await login(email, password);
      addToast(`Welcome back, ${loggedUser.name}!`, 'success');
      if (loggedUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(from);
      }
    } catch (err) {
      console.error('Login error details:', err);
      setError(err.message || 'Invalid credentials. Please try again.');
    }
  };

  const fillCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@rentiq.com');
      setPassword('admin123');
    } else {
      setEmail('alex@example.com');
      setPassword('customer123');
    }
  };

  return (
    <div className="min-h-screen bg-cream-paper flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-fresh-grass flex items-center justify-center font-black text-ink-black text-lg">
              IQ
            </div>
            <span className="text-2xl font-bold tracking-tight text-ink-black">RentIQ</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-ink-black">Sign In to Your Account</h1>
          <p className="text-xs text-stone-gray font-medium">
            Manage your active rentals, track return dates, and view tax invoices.
          </p>
        </div>

        {/* Credentials Preset Helper Card */}
        <div className="p-4 bg-sandstone/30 rounded-3xl border border-hairline-mist space-y-3">
          <span className="text-[11px] font-bold text-stone-gray uppercase tracking-wider block text-center">
            Fill Demo Credentials:
          </span>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={User}
              type="button"
              onClick={() => fillCredentials('customer')}
            >
              Customer Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={Shield}
              type="button"
              onClick={() => fillCredentials('admin')}
            >
              Admin Details
            </Button>
          </div>
        </div>

        {/* Form Card */}
        <Card className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="customer@rentiq.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-xs font-semibold text-coral-pop bg-coral-pop/10 p-2.5 rounded-xl border border-coral-pop/30">
                {error}
              </p>
            )}

            <Button variant="primary" type="submit" className="w-full" isLoading={loading}>
              Sign In
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-hairline-mist text-xs text-stone-gray">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-ink-black hover:text-fresh-grass">
              Create an Account
            </Link>
          </div>
        </Card>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-xs font-semibold text-stone-gray hover:text-ink-black">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
