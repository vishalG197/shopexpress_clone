import { updateCartCount } from './main.js';
import { showToast } from './notification.js';

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allProducts = [];
let currentFilters = {
    search: '',
    categories: ['all'],
    minPrice: 0,
    maxPrice: Infinity,
    sortBy: 'default'
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Filters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        currentFilters.search = searchParam.toLowerCase();
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.value = searchParam;
    }

    // Check for category in URL (e.g. from nav links)
    const catParam = urlParams.get('category');
    if (catParam) {
        currentFilters.categories = [catParam.toLowerCase()];
    }

    fetchData();
    setupEventListeners();
});

async function fetchData() {
    try {
        // Fetch from Fake Store API
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        allProducts = data;

        // Dynamically render categories based on API data
        renderCategoryFilters();

        applyFilters(); // Apply initial filters
    } catch (err) {
        console.error("Error fetching data:", err);
        document.getElementById("product-container").innerHTML = `
            <div style="text-align: center; grid-column: 1/-1; padding: 2rem;">
                <p>Failed to load products. Please try again later.</p>
            </div>
        `;
        showToast("Failed to load products", "error");
    }
}

function renderCategoryFilters() {
    const categoryContainer = document.getElementById("category-filters");
    if (!categoryContainer) return;

    // Extract unique categories
    const categories = ['all', ...new Set(allProducts.map(p => p.category))];

    categoryContainer.innerHTML = ''; // Clear existing static HTML

    categories.forEach(cat => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';

        // CAPITALIZE FIRST LETTER
        const displayCat = cat.charAt(0).toUpperCase() + cat.slice(1);

        const isChecked = currentFilters.categories.includes(cat.toLowerCase()) ||
            (cat === 'all' && currentFilters.categories.includes('all'));

        label.innerHTML = `
            <input type="checkbox" value="${cat}" ${isChecked ? 'checked' : ''}> ${displayCat}
        `;
        categoryContainer.appendChild(label);
    });
}

function setupEventListeners() {
    // Search Input (Navbar)
    const searchForm = document.getElementById("search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const searchInput = document.getElementById("search-input");
            currentFilters.search = searchInput.value.trim().toLowerCase();
            applyFilters();
        });
    }

    // Sorting
    const sortSelect = document.getElementById("sorting");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            currentFilters.sortBy = e.target.value;
            applyFilters();
        });
    }

    // Category Filters - Event Delegation
    const categoryOptions = document.getElementById("category-filters");
    if (categoryOptions) {
        categoryOptions.addEventListener("change", (e) => {
            if (e.target.type === "checkbox") {
                handleCategoryChange(e.target);
                applyFilters();
            }
        });
    }

    // Price Filters
    const applyPriceBtn = document.getElementById("apply-price");
    if (applyPriceBtn) {
        applyPriceBtn.addEventListener("click", () => {
            const min = document.getElementById("min-price").value;
            const max = document.getElementById("max-price").value;
            currentFilters.minPrice = min ? parseFloat(min) : 0;
            currentFilters.maxPrice = max ? parseFloat(max) : Infinity;
            applyFilters();
        });
    }

    // Clear Filters
    const clearBtn = document.getElementById("clear-filters");
    if (clearBtn) {
        clearBtn.addEventListener("click", clearAllFilters);
    }
}

function handleCategoryChange(changedCheckbox) {
    const checkboxes = document.querySelectorAll('#category-filters input[type="checkbox"]');

    if (changedCheckbox.value === 'all') {
        if (changedCheckbox.checked) {
            checkboxes.forEach(cb => {
                if (cb.value !== 'all') cb.checked = false;
            });
            currentFilters.categories = ['all'];
        } else {
            currentFilters.categories = [];
        }
    } else {
        // If specific category checked, uncheck 'all'
        if (changedCheckbox.checked) {
            const allCb = document.querySelector('#category-filters input[value="all"]');
            if (allCb) allCb.checked = false;
        }

        // Collect all checked
        const checked = Array.from(checkboxes)
            .filter(cb => cb.checked && cb.value !== 'all')
            .map(cb => cb.value);

        currentFilters.categories = checked.length > 0 ? checked : ['all'];

        // If nothing checked, revert visual to 'all'
        if (checked.length === 0) {
            const allCb = document.querySelector('#category-filters input[value="all"]');
            if (allCb) {
                allCb.checked = true;
                currentFilters.categories = ['all'];
            }
        }
    }
}

function clearAllFilters() {
    currentFilters = {
        search: '',
        categories: ['all'],
        minPrice: 0,
        maxPrice: Infinity,
        sortBy: 'default'
    };

    // Reset inputs
    document.getElementById("search-input").value = "";
    document.getElementById("min-price").value = "";
    document.getElementById("max-price").value = "";
    document.getElementById("sorting").value = "default";

    // Re-render categories to reset checkboxes
    renderCategoryFilters();

    applyFilters();
}

function applyFilters() {
    let filtered = allProducts.filter(product => {
        // 1. Search
        const matchesSearch = product.title.toLowerCase().includes(currentFilters.search) ||
            product.category.toLowerCase().includes(currentFilters.search);

        // 2. Category
        let matchesCategory = false;
        if (currentFilters.categories.includes('all')) {
            matchesCategory = true;
        } else {
            // Check perfect match for API categories
            matchesCategory = currentFilters.categories.includes(product.category);
        }

        // 3. Price
        const matchesPrice = product.price >= currentFilters.minPrice && product.price <= currentFilters.maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    // 4. Sort
    if (currentFilters.sortBy === 'low-high') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentFilters.sortBy === 'high-low') {
        filtered.sort((a, b) => b.price - a.price);
    }

    // Update UI Count
    const countEl = document.getElementById("product-count");
    if (countEl) countEl.textContent = `Showing ${filtered.length} products`;

    displayProducts(filtered);
}

function displayProducts(products) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; grid-column: 1/-1; padding: 4rem;">
                <i class="fa-solid fa-ghost" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <p>No products found matching your criteria.</p>
                <button onclick="document.getElementById('clear-filters').click()" style="margin-top: 1rem; color: var(--primary-color); background: none; border: underline; cursor: pointer;">Clear Filters</button>
            </div>
        `;
        return;
    }

    products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        const imageUrl = product.image;

        card.innerHTML = `
            <div class="product-image-container" onclick="window.location.href='/product-details.html?id=${product.id}'" style="cursor: pointer;">
                 <img src="${imageUrl}" alt="${product.title}" class="product-image" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/300?text=No+Image'">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title" title="${product.title}" onclick="window.location.href='/product-details.html?id=${product.id}'" style="cursor: pointer;">${product.title}</h3>
                <div class="product-price">₹${product.price}</div>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;

        const btn = card.querySelector('.add-to-cart-btn');
        btn.addEventListener("click", () => addToCart(product));

        container.append(card);
    });
}

function addToCart(product) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Simple add logic for list view (quantity 1)
    if (cart.some(item => item.id === product.id)) {
        showToast("This product is already in your cart.", "info");
        return;
    }

    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event('storage'));
    updateCartCount();
    showToast("Product added to cart!", "success");
}

