document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadProfile();
    loadOrders();
    setupLogout();
});

function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'signin.html';
    }
}

function loadProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    document.getElementById('profile-name-display').textContent = currentUser.name;
    document.getElementById('profile-email-display').textContent = currentUser.email;
    document.getElementById('profile-avatar-initial').textContent = currentUser.name.charAt(0).toUpperCase();
}

function loadOrders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const ordersContainer = document.getElementById('orders-list');

    // Get all orders and filter by current user email
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = allOrders.filter(order => order.shipping && order.shipping.email === currentUser.email);

    // Sort by date desc
    userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (userOrders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>No orders found</h3>
                <p>Looks like you haven't placed any orders yet.</p>
                <a href="product.html" class="auth-btn" style="display:inline-block; margin-top:1rem; text-decoration:none; width:auto;">Start Shopping</a>
            </div>
        `;
        return;
    }

    ordersContainer.innerHTML = '';
    userOrders.forEach(order => {
        const date = new Date(order.date).toLocaleDateString();

        let imagesHtml = '';
        order.items.slice(0, 4).forEach(item => {
            // Handle old CDN links vs placeholders
            const imgUrl = item.image;

            imagesHtml += `<img src="${imgUrl}" alt="${item.title}" class="preview-img" title="${item.title}">`;
        });

        if (order.items.length > 4) {
            imagesHtml += `<div class="preview-img" style="display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-size:0.8rem;font-weight:600;">+${order.items.length - 4}</div>`;
        }

        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        // Make entire card clickable
        orderCard.style.cursor = 'pointer';
        orderCard.addEventListener('click', () => {
            window.location.href = `order-details.html?id=${order.orderId}`;
        });
        orderCard.innerHTML = `
            <div class="order-header">
                <div>
                    <div class="order-id">${order.orderId}</div>
                    <div class="order-date">Placed on ${date}</div>
                </div>
                <div class="order-status status-pending">Pending</div>
            </div>
            <div class="order-items-preview">
                ${imagesHtml}
            </div>
            <div class="order-footer">
                <div>${order.items.length} items</div>
                <div class="order-total">Total: ₹${order.total}</div>
            </div>
        `;
        ordersContainer.appendChild(orderCard);
    });
}

function setupLogout() {
    const logoutBtn = document.getElementById('profile-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
}
