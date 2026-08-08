import { authService } from '../services/authService';
import { productService } from '../services/productService';
import { rentalService } from '../services/rentalService';
import { returnService } from '../services/returnService';
import { paymentService } from '../services/paymentService';
import { userService } from '../services/userService';

// Unified Service Wrapper
export const api = {
  auth: authService,
  products: productService,
  rentals: rentalService,
  returns: returnService,
  payments: paymentService,
  users: userService
};

export default api;
