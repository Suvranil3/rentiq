import { authService } from '../services/authService';
import { productService } from '../services/productService';
import { rentalService } from '../services/rentalService';
import { returnService } from '../services/returnService';
import { paymentService } from '../services/paymentService';
import { userService } from '../services/userService';
import { addressService } from '../services/addressService';
import { quotationService } from '../services/quotationService';
import { invoiceService } from '../services/invoiceService';
import { pricelistService } from '../services/pricelistService';

// Unified Service Wrapper
export const api = {
  auth: authService,
  products: productService,
  rentals: rentalService,
  returns: returnService,
  payments: paymentService,
  users: userService,
  addresses: addressService,
  quotations: quotationService,
  invoices: invoiceService,
  pricelists: pricelistService
};

export default api;
