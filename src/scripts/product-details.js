import { updateCartCount } from './main.js';
import { showToast } from './notification.js';

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProductDetails(productId);
    } else {
        showError("Invalid Product ID.");
    }
});

async function fetchProductDetails(id) {
    try {
        // Fetch single product from Fake Store API
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found");

        const product = await response.json();

        if (product) {
            renderProduct(product);
        } else {
            showError("Product not found.");
        }
    } catch (err) {
        console.error("Error fetching product:", err);
        showError("Failed to load product details.");
    }
}

function renderProduct(product) {
    const container = document.getElementById("details-container");

    // Calculate a fake original price if not provided, just for display
    const originalPrice = product.originalPrice || Math.floor(product.price * 1.2);

    container.innerHTML = `
        <div class="product-detail-wrapper">
            <div class="detail-image-container">
                <img src="${product.image}" alt="${product.title}" class="detail-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/500?text=No+Image'">
            </div>
            <div class="detail-info">
                <span class="detail-category">${product.category || 'General'}</span>
                <h1 class="detail-title">${product.title}</h1>
                
                <div class="detail-price">
                    ₹${product.price}
                    <span class="original-price">₹${originalPrice}</span>
                </div>

                <p class="detail-description">
                    ${product.description || "Experience premium quality with this generic product description. It fulfills all your needs with style and durability."}
                </p>

                <div class="quantity-selector">
                    <span>Quantity:</span>
                    <div class="qty-controls">
                        <button id="qty-minus" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
                        <input type="number" id="qty-input" value="1" min="1" max="10" readonly>
                        <button id="qty-plus" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>

                <div class="detail-actions">
                    <button class="add-to-cart-large" id="add-btn">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="buy-now-btn" id="buy-btn">
                        <i class="fa-solid fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        </div>
    `;

    setupQuantityControls();
    document.getElementById("add-btn").addEventListener("click", () => addToCart(product));
    document.getElementById("buy-btn").addEventListener("click", () => {
        addToCart(product);
        setTimeout(() => window.location.href = "/cart.html", 500);
    });
}

function setupQuantityControls() {
    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');
    const input = document.getElementById('qty-input');

    if (!minusBtn || !plusBtn || !input) return;

    minusBtn.addEventListener('click', () => {
        let val = parseInt(input.value);
        if (val > 1) {
            input.value = val - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let val = parseInt(input.value);
        if (val < 10) {
            input.value = val + 1;
        }
    });
}

function addToCart(product) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Get Quantity
    const qtyInput = document.getElementById('qty-input');
    const quantity = qtyInput ? parseInt(qtyInput.value) : 1;

    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        // Update quantity
        cart[existingItemIndex].quantity += quantity;
        showToast(`Updated cart quantity to ${cart[existingItemIndex].quantity}!`, "success");
    } else {
        // Add new
        cart.push({ ...product, quantity: quantity });
        showToast("Product added to cart!", "success");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    updateCartCount();
}

function showError(message) {
    document.getElementById("details-container").innerHTML = `
        <div class="loading-state">
            <i class="fa-solid fa-circle-exclamation" style="font-size: 2rem; margin-bottom: 1rem; color: var(--secondary-color);"></i>
            <p>${message}</p>
            <a href="/product.html" style="color: var(--primary-color); text-decoration: underline; margin-top: 1rem; display: block;">Back to Products</a>
        </div>
    `;
}
