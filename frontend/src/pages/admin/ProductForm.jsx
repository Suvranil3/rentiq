import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { api } from '../../api/api';
import { useToast } from '../../context/ToastContext';
import { ArrowLeft, Save, Package } from 'lucide-react';

export const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const isEdit = !!id && id !== 'new';

  const [formData, setFormData] = useState({
    name: '',
    category: 'Cameras',
    brand: '',
    manufacturer: '',
    color: 'Black',
    size: 'Standard',
    shortDescription: '',
    fullDescription: '',
    hourlyPrice: 200,
    dailyPrice: 1200,
    weeklyPrice: 6000,
    monthlyPrice: 18000,
    securityDeposit: 4000,
    totalStock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const loadProduct = async () => {
        try {
          const p = await api.products.getById(id);
          setFormData({
            ...p,
            imageUrl: p.images ? p.images[0] : ''
          });
        } catch (err) {
          addToast('Product not found.', 'error');
          navigate('/admin/products');
        }
      };
      loadProduct();
    }
  }, [id, isEdit]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        hourlyPrice: Number(formData.hourlyPrice),
        dailyPrice: Number(formData.dailyPrice),
        weeklyPrice: Number(formData.weeklyPrice),
        monthlyPrice: Number(formData.monthlyPrice),
        securityDeposit: Number(formData.securityDeposit),
        totalStock: Number(formData.totalStock),
        availableStock: Number(formData.totalStock),
        images: [formData.imageUrl || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80']
      };

      if (isEdit) {
        await api.products.update(id, payload);
        addToast(`Updated ${formData.name} successfully!`, 'success');
      } else {
        await api.products.create(payload);
        addToast(`Created new product ${formData.name}!`, 'success');
      }
      navigate('/admin/products');
    } catch (err) {
      addToast('Failed to save product.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-cream-paper">
      <AdminSidebar />

      <main className="grow p-8 space-y-8 overflow-y-auto max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/admin/products')}
          className="inline-flex items-center gap-1 text-xs font-bold text-stone-gray hover:text-ink-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products List</span>
        </button>

        <div className="pb-4 border-b border-hairline-mist">
          <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Catalog Management</span>
          <h1 className="text-3xl font-black text-ink-black tracking-tight">
            {isEdit ? `Edit Product: ${formData.name}` : 'Add New Rental Equipment'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Attributes */}
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-ink-black">1. General Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Product Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
              <Input
                label="Category"
                type="select"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                options={[
                  { label: 'Cameras', value: 'Cameras' },
                  { label: 'Drones', value: 'Drones' },
                  { label: 'Audio', value: 'Audio' },
                  { label: 'Lighting', value: 'Lighting' },
                  { label: 'Mobility', value: 'Mobility' }
                ]}
              />
              <Input
                label="Brand"
                value={formData.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                required
              />
              <Input
                label="Manufacturer"
                value={formData.manufacturer}
                onChange={(e) => handleChange('manufacturer', e.target.value)}
                required
              />
              <Input
                label="Color"
                value={formData.color}
                onChange={(e) => handleChange('color', e.target.value)}
              />
              <Input
                label="Size / Form Factor"
                value={formData.size}
                onChange={(e) => handleChange('size', e.target.value)}
              />
            </div>

            <Input
              label="Short Summary Description"
              value={formData.shortDescription}
              onChange={(e) => handleChange('shortDescription', e.target.value)}
            />
            <Input
              label="Full Technical Description"
              type="textarea"
              value={formData.fullDescription}
              onChange={(e) => handleChange('fullDescription', e.target.value)}
            />
          </Card>

          {/* Pricing Tiers & Deposit */}
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-ink-black">2. Tiered Pricing & Security Deposit</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Input
                label="Hourly Rate (₹)"
                type="number"
                value={formData.hourlyPrice}
                onChange={(e) => handleChange('hourlyPrice', e.target.value)}
                required
              />
              <Input
                label="Daily Rate (₹)"
                type="number"
                value={formData.dailyPrice}
                onChange={(e) => handleChange('dailyPrice', e.target.value)}
                required
              />
              <Input
                label="Weekly Rate (₹)"
                type="number"
                value={formData.weeklyPrice}
                onChange={(e) => handleChange('weeklyPrice', e.target.value)}
              />
              <Input
                label="Monthly Rate (₹)"
                type="number"
                value={formData.monthlyPrice}
                onChange={(e) => handleChange('monthlyPrice', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Required Security Deposit (Held in Escrow) (₹)"
                type="number"
                value={formData.securityDeposit}
                onChange={(e) => handleChange('securityDeposit', e.target.value)}
                required
              />
              <Input
                label="Total Inventory Fleet Count (Stock)"
                type="number"
                value={formData.totalStock}
                onChange={(e) => handleChange('totalStock', e.target.value)}
                required
              />
            </div>
          </Card>

          {/* Image URL */}
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-ink-black">3. Product Photography</h3>
            <Input
              label="Primary Image URL"
              value={formData.imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => navigate('/admin/products')}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={Save} isLoading={isSubmitting}>
              {isEdit ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};
