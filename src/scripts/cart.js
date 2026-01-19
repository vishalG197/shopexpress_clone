import { updateCartCount } from './main.js';
import { showToast } from './notification.js';

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.querySelector(".cart-items");
const emptyCart = document.querySelector(".empty-cart");
const cartTotalElements = document.querySelectorAll("#cart-total");
const buyButton = document.getElementById("buy");
const clearCartBtn = document.getElementById("clear-cart-btn");

document.addEventListener('DOMContentLoaded', () => {
    displayCart();

    if (buyButton) {
        buyButton.addEventListener("click", handleCheckout);
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", clearCart);
    }
});

function displayCart() {
    // Refresh cart from storage
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cartContainer || !emptyCart) return;

    if (cart.length === 0) {
        cartContainer.parentElement.style.display = "none"; // Hide cart items wrapper
        if (document.querySelector('.cart-summary')) document.querySelector('.cart-summary').style.display = 'none';
        emptyCart.style.display = "block";
        return;
    }

    cartContainer.parentElement.style.display = "block";
    if (document.querySelector('.cart-summary')) document.querySelector('.cart-summary').style.display = 'block';
    emptyCart.style.display = "none";

    cartContainer.innerHTML = cart.map((item) => {
        // Use Unsplash placeholder if URL is from old CDN (often broken) or just fallback
        const imageUrl = item.image.includes('cdn.shopclues.com')
            ? `https://images.unsplash.com/photo-1593998066526-65fcab3021a2?w=200&q=80`
            : item.image;

        return `
        <div class="cart-item" data-id="${item.id}">
             <img src="${imageUrl}" alt="${item.title}" class="item-image">
            <div class="item-details">
                <h3 class="item-name">${item.title}</h3>
                <p class="item-price">₹${item.price}</p>
            </div>
            <div class="item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn decrement" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn increment" data-id="${item.id}" aria-label="Increase quantity">+</button>
                </div>
                 <button class="remove-btn" data-id="${item.id}" aria-label="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `}).join("");

    attachEventListeners();
    updateTotal();
}

function attachEventListeners() {
    document.querySelectorAll(".decrement").forEach(button => {
        button.addEventListener("click", () => updateQuantity(parseInt(button.dataset.id), "decrease"));
    });

    document.querySelectorAll(".increment").forEach(button => {
        button.addEventListener("click", () => updateQuantity(parseInt(button.dataset.id), "increase"));
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => removeItem(parseInt(button.dataset.id)));
    });
}

function updateQuantity(id, action) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    if (action === "increase") {
        item.quantity++;
    } else if (action === "decrease") {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            // Optional: confirm removal if quantity becomes 0? 
            // For now, just stay at 1 or remove logic could be added
        }
    }

    saveCart();
    displayCart();
}

function removeItem(id) {
    if (confirm("Are you sure you want to remove this item?")) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        displayCart();
        updateCartCount(); // Update the navbar badge
    }
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElements.forEach(el => {
        el.textContent = total.toFixed(2);
    });
}

function clearCart() {
    if (confirm("Are you sure you want to clear your entire cart?")) {
        cart = [];
        saveCart();
        displayCart();
        updateCartCount();
        showToast("Cart cleared!", "info");
    }
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function handleCheckout() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        // Save current path to return after login?
        if (confirm("You need to sign in to proceed. Go to login page?")) {
            window.location.href = "signin.html";
        }
    } else {
        window.location.href = "checkout.html";
    }
}
