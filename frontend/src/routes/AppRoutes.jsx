import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';

// Lazy-loaded Public Pages
const Home = lazy(() => import('../pages/public/Home').then(m => ({ default: m.Home })));
const Products = lazy(() => import('../pages/public/Products').then(m => ({ default: m.Products })));
const ProductDetails = lazy(() => import('../pages/public/ProductDetails').then(m => ({ default: m.ProductDetails })));

// Lazy-loaded Auth Pages
const Login = lazy(() => import('../pages/auth/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('../pages/auth/Register').then(m => ({ default: m.Register })));

// Lazy-loaded Customer Pages
const Cart = lazy(() => import('../pages/customer/Cart').then(m => ({ default: m.Cart })));
const Checkout = lazy(() => import('../pages/customer/Checkout').then(m => ({ default: m.Checkout })));
const RentalConfirmation = lazy(() => import('../pages/customer/RentalConfirmation').then(m => ({ default: m.RentalConfirmation })));
const MyRentals = lazy(() => import('../pages/customer/MyRentals').then(m => ({ default: m.MyRentals })));
const RentalDetails = lazy(() => import('../pages/customer/RentalDetails').then(m => ({ default: m.RentalDetails })));
const Profile = lazy(() => import('../pages/customer/Profile').then(m => ({ default: m.Profile })));

// Lazy-loaded Admin Pages
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard').then(m => ({ default: m.Dashboard })));
const AdminProducts = lazy(() => import('../pages/admin/Products').then(m => ({ default: m.AdminProducts })));
const AdminProductForm = lazy(() => import('../pages/admin/ProductForm').then(m => ({ default: m.ProductForm })));
const AdminRentals = lazy(() => import('../pages/admin/Rentals').then(m => ({ default: m.AdminRentals })));
const AdminRentalDetails = lazy(() => import('../pages/admin/RentalDetails').then(m => ({ default: m.AdminRentalDetails })));
const AdminReturns = lazy(() => import('../pages/admin/Returns').then(m => ({ default: m.AdminReturns })));
const AdminPayments = lazy(() => import('../pages/admin/Payments').then(m => ({ default: m.AdminPayments })));
const AdminUsers = lazy(() => import('../pages/admin/Users').then(m => ({ default: m.AdminUsers })));
const AdminPricelists = lazy(() => import('../pages/admin/Pricelists').then(m => ({ default: m.AdminPricelists })));
const AdminQuotations = lazy(() => import('../pages/admin/Quotations').then(m => ({ default: m.AdminQuotations })));

const LoadingSpinner = () => (
  <div className="min-h-screen bg-cream-paper flex items-center justify-center p-8">
    <div className="w-10 h-10 border-4 border-fresh-grass border-t-transparent rounded-full animate-spin" />
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Routes */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/rental-confirmation/:id" element={<RentalConfirmation />} />
        <Route
          path="/my-rentals"
          element={
            <ProtectedRoute>
              <MyRentals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-rentals/:id"
          element={
            <ProtectedRoute>
              <RentalDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requireAdmin>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <ProtectedRoute requireAdmin>
              <AdminProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/:id"
          element={
            <ProtectedRoute requireAdmin>
              <AdminProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rentals"
          element={
            <ProtectedRoute requireAdmin>
              <AdminRentals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rentals/:id"
          element={
            <ProtectedRoute requireAdmin>
              <AdminRentalDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/returns"
          element={
            <ProtectedRoute requireAdmin>
              <AdminReturns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute requireAdmin>
              <AdminPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requireAdmin>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pricelists"
          element={
            <ProtectedRoute requireAdmin>
              <AdminPricelists />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/quotations"
          element={
            <ProtectedRoute requireAdmin>
              <AdminQuotations />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};
