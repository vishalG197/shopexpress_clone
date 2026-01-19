import { updateCartCount } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadOrderDetails();
});

function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'signin.html';
    }
}

function loadOrderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    const container = document.getElementById('order-details-container');

    if (!orderId) {
        container.innerHTML = '<div class="loading-state">Order ID missing. <a href="User.html">Go back</a></div>';
        return;
    }

    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = allOrders.find(o => o.orderId === orderId);

    if (!order) {
        container.innerHTML = '<div class="loading-state">Order not found. <a href="User.html">Go back</a></div>';
        return;
    }

    // Verify user owns this order
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (order.shipping.email !== currentUser.email) {
        container.innerHTML = '<div class="loading-state">You do not have permission to view this order.</div>';
        return;
    }

    renderOrder(order, container);
}

function renderOrder(order, container) {
    const date = new Date(order.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    const itemsHtml = order.items.map(item => {
        const imgUrl = item.image;

        return `
        <div class="item-row">
            <img src="${imgUrl}" alt="${item.title}" class="item-image">
            <div class="item-info">
                <div class="item-title">${item.title}</div>
                <div class="item-category">${item.category || 'Product'}</div>
                <div class="item-pricing">
                    ₹${item.price} x ${item.quantity}
                </div>
            </div>
            <div class="item-total" style="font-weight:600;">
                ₹${item.price * item.quantity}
            </div>
        </div>
    `}).join('');

    container.innerHTML = `
        <a href="User.html" class="back-link"><i class="fa-solid fa-arrow-left"></i> Back to My Orders</a>
        
        <div class="order-header-card">
            <div class="order-title">
                <h1>Order #${order.orderId}</h1>
                <div class="order-meta">Placed on ${date}</div>
            </div>
            <div class="order-status-badge">
                Pending
            </div>
        </div>

        <div class="order-content-grid">
            <div class="order-main">
                <div class="items-card">
                    ${itemsHtml}
                </div>
            </div>
            
            <div class="order-sidebar">
                <div class="shipping-card">
                    <h3 class="section-title">Shipping Details</h3>
                    <div class="address-details">
                        <p><strong>${order.shipping.firstName} ${order.shipping.lastName}</strong></p>
                        <p>${order.shipping.address}</p>
                        <p>${order.shipping.city} ${order.shipping.zip}</p>
                        <p>${order.shipping.country}</p>
                        <p style="margin-top:0.5rem;">${order.shipping.phone}</p>
                        <p>${order.shipping.email}</p>
                    </div>
                </div>

                <div class="summary-card">
                    <h3 class="section-title">Payment Summary</h3>
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>₹${order.total}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div class="summary-total">
                        <span>Total</span>
                        <span>₹${order.total}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}
