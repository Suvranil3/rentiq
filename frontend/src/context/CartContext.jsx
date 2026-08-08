import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('rentiq_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('rentiq_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, startDate, endDate, quantity = 1, customRentalFee = null, pricingMode = 'daily') => {
    setCartItems(prev => {
      const prodId = product.id || product._id;
      const existingIndex = prev.findIndex(item => (item.product.id || item.product._id) === prodId);
      
      // Calculate rental duration in days
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

      const computedFee = customRentalFee !== null ? customRentalFee : (days * product.dailyPrice * quantity);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          startDate,
          endDate,
          days,
          pricingMode,
          quantity: updated[existingIndex].quantity + quantity,
          rentalFee: updated[existingIndex].rentalFee + computedFee
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: `cart-item-${Date.now()}-${Math.random()}`,
          product,
          startDate,
          endDate,
          days,
          pricingMode,
          quantity,
          rentalFee: computedFee,
          securityDeposit: product.securityDeposit * quantity
        }
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartItemDates = (cartItemId, startDate, endDate) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === cartItemId) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        const rentalFeePerUnit = days * item.product.dailyPrice;
        return {
          ...item,
          startDate,
          endDate,
          days,
          rentalFee: rentalFeePerUnit * item.quantity
        };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Aggregated Totals
  const totalRentalFee = cartItems.reduce((acc, item) => acc + item.rentalFee, 0);
  const totalSecurityDeposit = cartItems.reduce((acc, item) => acc + item.securityDeposit, 0);
  const totalPayable = totalRentalFee + totalSecurityDeposit;
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemDates,
      clearCart,
      totalRentalFee,
      totalSecurityDeposit,
      totalPayable,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
