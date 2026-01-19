import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'Admin.html'),
        register: resolve(__dirname, 'Register.html'),
        user: resolve(__dirname, 'User.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        adminRegister: resolve(__dirname, 'adminregister.html'),
        cart: resolve(__dirname, 'cart.html'),
        order: resolve(__dirname, 'order.html'),
        product: resolve(__dirname, 'product.html'),
        productDetails: resolve(__dirname, 'product-details.html'),
        productList: resolve(__dirname, 'productlist.html'),
        signin: resolve(__dirname, 'signin.html'),
      },
    },
  },
});
