# ShopExpress - Modern E-commerce Platform

![ShopExpress Logo](./images/project%20logo.png)

ShopExpress is a modern, responsive e-commerce platform built with HTML, CSS, and JavaScript. It provides a seamless shopping experience with features like product browsing, cart management, user authentication, and secure checkout.

## 🌟 Features

- **User Authentication**
  - Secure login and registration system
  - User profile management
  - Session handling

- **Product Management**
  - Product catalog with categories
  - Detailed product pages
  - Search functionality
  - Product filtering

- **Shopping Cart**
  - Add/remove products
  - Quantity adjustment
  - Real-time price calculation
  - Persistent cart storage

- **Checkout Process**
  - Secure payment integration
  - Order summary
  - Shipping information
  - Order confirmation

- **Admin Dashboard**
  - Product management
  - Order tracking
  - User management
  - Analytics

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)
- Cloudflare account (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vishalG197/shopexpress_clone.git
   ```

2. Navigate to the project directory:
   ```bash
   cd shopexpress-clone
   ```

3. Open `index.html` in your browser to start the application.

## 📊 User Flow Diagram

```mermaid
graph TD
    A[Start] --> B[Landing Page]
    B --> C[Product Page]
    C --> D[Add to Cart]
    D --> E[Cart Page]
    E --> F{User Logged In?}
    F -->|No| G[Login/Register]
    G --> H[Checkout Page]
    F -->|Yes| H
    H --> I[Order Confirmation]
    I --> J[End]

    subgraph "User Journey"
    B
    C
    D
    E
    F
    G
    H
    I
    end
```

## 🖼️ Screenshots

### Landing Page
<img width="960" alt="Landing Page" src="https://github.com/vishalG197/shopexpress_clone/assets/119415070/b6534de1-08e0-48de-b29f-f9a13762f6dc">

### Product Page
<img width="960" alt="Product Page" src="https://github.com/vishalG197/shopexpress_clone/assets/119415070/0cffd7be-d719-45a8-8074-384e8cd4a333">

### Cart Page
<img width="960" alt="Cart Page" src="https://github.com/vishalG197/shopexpress_clone/assets/119415070/5341409b-123c-4871-b265-518d2ecf2053">

### Sign In and Login Page
<img width="960" alt="Authentication Page" src="https://github.com/vishalG197/shopexpress_clone/assets/119415070/eb71b2c9-81a1-4dc6-a907-8dc0e9c3ab1e">

### Admin Page
<img width="960" alt="Admin Dashboard" src="https://github.com/vishalG197/shopexpress_clone/assets/119415070/3ace1af6-2696-4bc8-bbcf-0760b70b1574">

## 🛠️ Project Structure

```
shopexpress-clone/
├── index.html          # Main entry point
├── index.css           # Main stylesheet
├── index.js            # Main JavaScript file
├── product.html        # Product page
├── product.css         # Product page styles
├── Usercart.html       # Shopping cart page
├── signin.html         # Login page
├── Register.html       # Registration page
├── Userchekout.html    # Checkout page
├── Data.json           # Product data
├── images/             # Image assets
├── cart/               # Cart functionality
└── User/               # User-related functionality
```

## 🔄 E-commerce Flow

1. **Landing Page**
   - Browse featured products
   - Use search functionality
   - Navigate to product categories

2. **Product Page**
   - View product details
   - Add products to cart
   - View related products

3. **Cart Management**
   - Review selected items
   - Adjust quantities
   - Remove items
   - Proceed to checkout

4. **Authentication**
   - New users: Register
   - Existing users: Login
   - Guest checkout option

5. **Checkout Process**
   - Review order
   - Enter shipping details
   - Select payment method
   - Confirm order

6. **Order Confirmation**
   - View order summary
   - Receive order number
   - Track order status

## 🌐 Deployment

The application is deployed on Cloudflare Pages. To deploy your own version:

1. Create a Cloudflare account
2. Go to Cloudflare Pages
3. Create a new project
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: (leave empty)
   - Build output directory: (leave empty)
6. Deploy!

## 🔧 Configuration

- Update `Data.json` to modify product information
- Customize colors and styles in CSS files
- Configure payment gateway settings in checkout page

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Vishal Giri - Initial work

## 🙏 Acknowledgments

- Font Awesome for icons
- Cloudflare for hosting
- All contributors and supporters

---

Made with ❤️ by Vishal Giri

