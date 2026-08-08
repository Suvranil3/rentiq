import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ArrowLeft } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, phone, password });
      addToast('Registration successful! Welcome to RentIQ.', 'success');
      navigate('/');
    } catch (err) {
      addToast('Registration failed. Please check inputs.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-cream-paper flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-fresh-grass flex items-center justify-center font-black text-ink-black text-lg">
              IQ
            </div>
            <span className="text-2xl font-bold tracking-tight text-ink-black">RentIQ</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-ink-black">Create Customer Account</h1>
          <p className="text-xs text-stone-gray font-medium">
            Join RentIQ to rent production gear, track active rentals, and manage deposit refunds.
          </p>
        </div>

        <Card className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

            <Button variant="primary" type="submit" className="w-full" isLoading={loading}>
              Create Account
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-hairline-mist text-xs text-stone-gray">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-ink-black hover:text-fresh-grass">
              Sign In
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
