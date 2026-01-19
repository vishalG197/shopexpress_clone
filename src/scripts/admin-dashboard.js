import { checkAdminAuth } from './admin-auth.js';

// Check auth on load
document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();

    // Initialize Dashboard based on current page
    if (window.location.pathname.includes('productlist.html') || window.location.pathname === '/productlist.html') {
        initProductDashboard();
    } else if (window.location.pathname.includes('order.html') || window.location.pathname === '/order.html') {
        initOrderDashboard();
    }

    setupLogout();
});

function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('adminSession');
            window.location.href = 'Admin.html';
        });
    }
}

// --- Product Dashboard Logic ---

function initProductDashboard() {
    refreshProductTable();

    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }
}

async function refreshProductTable() {
    const tableBody = document.getElementById('product-table-body');
    if (!tableBody) return;

    // Fetch data (mix of JSON and LocalStorage for demo purposes)
    // In a real app, this would be an API call.
    // Here we'll rely on Data.json initially, but modify a localStorage copy if we want persistence of new items
    // For simplicity in this static demo, let's just read Data.json AND any local additions? 
    // Or just use localStorage if populated, else seed from Data.json?

    let products = JSON.parse(localStorage.getItem('products'));

    if (!products) {
        try {
            const res = await fetch('/Data.json');
            products = await res.json();
            localStorage.setItem('products', JSON.stringify(products));
        } catch (err) {
            console.error(err);
            products = [];
        }
    }

    renderProductTable(products);
}

function renderProductTable(products) {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>
                <img src="${product.image}" alt="" style="width: 40px; height: 40px; object-fit: contain;">
                ${product.title}
            </td>
            <td>₹${product.price}</td>
            <td>${product.category}</td>
            <td>
                <button class="action-btn btn-danger" data-id="${product.id}">Delete</button>
            </td>
        `;

        row.querySelector('.btn-danger').addEventListener('click', () => handleDeleteProduct(product.id));
        tableBody.appendChild(row);
    });
}

function handleAddProduct(e) {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').value;

    if (!id || !title || !price) {
        alert('Please fill at least ID, Title and Price');
        return;
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.some(p => p.id == id)) {
        alert('Product ID already exists!');
        return;
    }

    products.push({
        id: parseInt(id),
        title,
        price: parseFloat(price),
        category,
        image
    });

    localStorage.setItem('products', JSON.stringify(products));
    alert('Product added!');
    e.target.reset();
    refreshProductTable();
}

function handleDeleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        refreshProductTable();
    }
}

// --- Order Dashboard Logic ---

function initOrderDashboard() {
    refreshOrderTable();
}

function refreshOrderTable() {
    const tableBody = document.getElementById('order-table-body');
    if (!tableBody) return;

    // Read 'orders' from checkout.js logic
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Sort by date desc
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));

    renderOrderTable(orders);
}

function renderOrderTable(orders) {
    const tableBody = document.getElementById('order-table-body');
    tableBody.innerHTML = '';

    if (orders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No orders found</td></tr>';
        return;
    }

    orders.forEach((order) => {
        const row = document.createElement('tr');
        const date = new Date(order.date).toLocaleDateString();

        row.innerHTML = `
            <td>${order.orderId || 'N/A'}</td>
            <td>${date}</td>
            <td>${order.shipping.firstName} ${order.shipping.lastName}</td>
            <td>${order.shipping.city}, ${order.shipping.zip}</td>
            <td>₹${order.total}</td>
            <td><span style="background:#dbeafe; color:#1e40af; padding:0.25rem 0.5rem; borderRadius:4px; font-size:0.85rem;">Pending</span></td>
            <td>
                <button class="action-btn btn-success" onclick="alert('Order marked as shipped!')">Ship</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
