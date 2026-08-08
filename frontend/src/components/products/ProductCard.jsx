import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { LoginRequiredModal } from '../ui/LoginRequiredModal';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Shield } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isAvailable = product.availableStock > 0;
  const prodId = product.id || product._id;

  const handleCardClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <Card hover padding="none" className="overflow-hidden flex flex-col h-full group">
        {/* Product Image Container */}
        <div className="relative aspect-4/3 bg-sandstone/30 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge status={isAvailable ? 'Available' : 'Unavailable'} size="sm">
              {isAvailable ? `${product.availableStock} Available` : 'Rented Out'}
            </Badge>
          </div>
          <div className="absolute top-3 left-3 bg-pure-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-ink-black border border-hairline-mist">
            {product.category}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 flex flex-col justify-between grow space-y-4">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-stone-gray uppercase tracking-wider">
              {product.brand}
            </div>
            <h3 className="text-base font-bold text-ink-black group-hover:text-fresh-grass transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs text-stone-gray line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing & Deposit */}
          <div className="pt-3 border-t border-hairline-mist/60 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xl font-black text-ink-black">₹{product.dailyPrice.toLocaleString()}</span>
                <span className="text-xs text-stone-gray font-medium"> / day</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-gray bg-sandstone/30 px-2 py-0.5 rounded-md">
                <Shield className="w-3 h-3 text-stone-gray" />
                <span>Deposit ₹{product.securityDeposit.toLocaleString()}</span>
              </div>
            </div>

            {user ? (
              <Link to={`/products/${prodId}`} className="block">
                <Button variant="outline" className="w-full justify-between" icon={ArrowRight}>
                  View Details
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-between"
                icon={ArrowRight}
                onClick={handleCardClick}
              >
                View Details
              </Button>
            )}
          </div>
        </div>
      </Card>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        targetPath={`/products/${prodId}`}
      />
    </>
  );
};
