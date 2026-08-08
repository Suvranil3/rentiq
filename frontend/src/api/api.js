import { authService } from '../services/authService';
import { productService } from '../services/productService';
import { rentalService } from '../services/rentalService';
import { returnService } from '../services/returnService';
import { paymentService } from '../services/paymentService';
import { adminService } from '../services/adminService';

// Unified Service Wrapper
export const api = {
  auth: authService,
  products: productService,
  rentals: rentalService,
  returns: returnService,
  payments: paymentService,
  ai: adminService
};

export default api;
