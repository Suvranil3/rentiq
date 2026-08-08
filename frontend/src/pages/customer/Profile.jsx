import React, { useState } from 'react';
import { FloatingNavbar } from '../../components/layout/FloatingNavbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Mail, Phone, MapPin, Shield, CheckCircle2 } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(user?.name || 'Alex Johnson');
  const [email, setEmail] = useState(user?.email || 'customer@rentiq.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [street, setStreet] = useState('42 MG Road, Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [zip, setZip] = useState('560038');

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Profile information updated successfully.', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-paper">
      <FloatingNavbar />

      <main className="grow max-w-4xl mx-auto w-full px-6 md:px-12 py-10 space-y-8">
        <div className="pb-4 border-b border-hairline-mist">
          <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Account Portal</span>
          <h1 className="text-3xl font-black text-ink-black tracking-tight">Customer Profile</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar Header Card */}
          <Card className="flex items-center gap-6 p-6">
            <div className="w-20 h-20 rounded-full bg-fresh-grass text-ink-black flex items-center justify-center font-black text-2xl shadow-sm">
              {name ? name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink-black">{name}</h2>
              <p className="text-xs text-stone-gray font-medium mt-0.5">{email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-[#e8f7df] text-[#2a6809] font-bold text-[10px] rounded-full border border-[#c4ebae]">
                VERIFIED CUSTOMER ACCOUNT
              </span>
            </div>
          </Card>

          {/* Personal Info Card */}
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-ink-black flex items-center gap-2">
              <User className="w-5 h-5 text-fresh-grass" />
              <span>Personal Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </Card>

          {/* Saved Address Card */}
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-ink-black flex items-center gap-2">
              <MapPin className="w-5 h-5 text-fresh-grass" />
              <span>Default Shipping Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Street Address"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <Input
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <Input
                label="Postal Code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
          </Card>

          <div className="flex justify-end">
            <Button variant="primary" type="submit" size="md">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};
