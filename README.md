# ShopExpress - Modern E-commerce Platform

![ShopExpress Logo](./src/assets/images/project_logo.png)

ShopExpress is a modern, responsive e-commerce platform built with HTML, CSS, and JavaScript. It delivers a premium shopping experience with dynamic product fetching, a robust cart system, and a secure, validated checkout process.

## 🌟 Key Features

### 🛍️ Dynamic Shopping Experience
- **API Integration**: Real-time product data fetched from the **Fake Store API**.
- **Smart Filtering**: Dynamic category filters generated from available products.
- **Search**: Instant product search functionality.
- **Product Details**: Comprehensive product views with related items.

### 💳 enhanced Checkout & Cart
- **Modern Cart**: Card-based items, real-time total calculation, and "Clear Cart" option.
- **Secure Checkout Process**:
  - Step-by-step navigation (Shipping → Payment).
  - **Credit Card Validation**: auto-formatting (spaces, dates) and real-time form validation.
  - **Order Confirmation**: Beautiful success modal with order ID generation.

### 🎨 Modern UI/UX
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Premium Aesthetic**: Clean typography (Inter font), soft shadows, and smooth transitions.
- **Interactive Elements**: Hover effects, loading states, and toast notifications.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Variables, Grid, Flexbox), JavaScript (ES6+ Modules)
- **Data Source**: [Fake Store API](https://fakestoreapi.com/)
- **Imagery**: [Unsplash](https://unsplash.com/) (High-quality banners)
- **Icons**: Font Awesome 6

## 📂 Project Structure

```
shopexpress-clone/
├── src/
│   ├── assets/         # Images and logos
│   ├── scripts/        # Modular JavaScript logic
│   │   ├── main.js     # Global app logic
│   │   ├── cart.js     # Cart management
│   │   ├── checkout.js # Checkout & validation
│   │   └── ...
│   └── styles/         # CSS Modules
│       ├── variables.css # Global design tokens
│       ├── checkout.css  # Specific page styles
│       └── ...
├── index.html          # Homepage with dynamic sliders
├── product.html        # Product listing page
├── product-details.html# Single product view
├── cart.html           # Shopping cart
├── checkout.html       # Checkout page
└── README.md           # Project documentation
```

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/vishalG197/shopexpress_clone.git
    cd shopexpress-clone
    ```

2.  **Install dependencies** (if using a package manager)
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open the local server URL in your browser to start shopping!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

---

Made with ❤️ by Vishal Giri
