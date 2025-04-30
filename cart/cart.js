// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.querySelector(".cart-items");
const emptyCart = document.querySelector(".empty-cart");
const cartTotal = document.getElementById("cart-total");
const buyButton = document.getElementById("buy");

// Display cart items
function displayCart() {
    if (cart.length === 0) {
        cartContainer.style.display = "none";
        emptyCart.style.display = "block";
        cartTotal.textContent = "0";
        return;
    }

    cartContainer.style.display = "block";
    emptyCart.style.display = "none";
    
    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" class="item-image">
            <div class="item-details">
                <h3 class="item-title">${item.title}</h3>
                <p class="item-price">₹${item.price}</p>
            </div>
            <div class="quantity-control">
                <button class="quantity-btn decrement" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increment" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join("");

    // Add event listeners
    document.querySelectorAll(".decrement").forEach(button => {
        button.addEventListener("click", () => updateQuantity(button.dataset.id, "decrease"));
    });

    document.querySelectorAll(".increment").forEach(button => {
        button.addEventListener("click", () => updateQuantity(button.dataset.id, "increase"));
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => removeItem(button.dataset.id));
    });

    updateTotal();
}

// Update item quantity
function updateQuantity(id, action) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    if (action === "increase") {
        item.quantity++;
    } else if (action === "decrease" && item.quantity > 1) {
        item.quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Remove item from cart
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Update total price
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelectorAll("#cart-total").forEach(el => {
        el.textContent = total;
    });
}

// Handle buy now button
buyButton.addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        if (confirm("You need to sign in first. Would you like to sign in now?")) {
            window.location.href = "signin.html";
        }
    } else {
        window.location.href = "Userchekout.html";
    }
});

// Initialize cart display
displayCart();

// Update user info in navbar
const userInfo = document.getElementById("user-info");
const userName = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");
const signinLink = document.getElementById("signin-link");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    userName.textContent = currentUser.name;
    logoutBtn.style.display = "block";
    signinLink.style.display = "none";
} else {
    userName.textContent = "";
    logoutBtn.style.display = "none";
    signinLink.style.display = "block";
}

// Handle logout
logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
});