const bannerImages = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80', // Shop
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80', // Fashion
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'  // Product
];

document.addEventListener("DOMContentLoaded", () => {
  initSlideshow(bannerImages);
  checkUserLoginStatus();
  loadHomepageProducts();
});

function initSlideshow(images) {
  const slideContainer = document.getElementById("slideshow");
  if (!slideContainer) return;

  let currentIndex = 0;
  const imgElement = document.createElement("img");
  imgElement.style.opacity = '0';
  imgElement.style.transition = 'opacity 0.5s ease-in-out';
  imgElement.src = images[0];

  imgElement.onload = () => { imgElement.style.opacity = '1'; };

  slideContainer.innerHTML = '';
  slideContainer.appendChild(imgElement);

  setInterval(() => {
    imgElement.style.opacity = '0';
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex];
      imgElement.onload = () => { imgElement.style.opacity = '1'; };
    }, 500); // Wait for fade out
  }, 4000);
}

async function loadHomepageProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    // 1. Festival Special (Map to Women's Clothing)
    const festivalProducts = products.filter(p => p.category === "women's clothing");
    initCarousel("festival-carousel", festivalProducts);

    // 2. Daily Essentials (Map to Jewelery / Men's Clothing mix)
    const essentialProducts = products.filter(p => p.category === "jewelery" || p.category === "men's clothing");
    initCarousel("essentials-carousel", essentialProducts);

    // 3. Gadget Store (Map to Electronics)
    const gadgetProducts = products.filter(p => p.category === "electronics");
    initCarousel("gadget-carousel", gadgetProducts);

  } catch (err) {
    console.error("Failed to load homepage products:", err);
  }
}

function initCarousel(elementId, products) {
  const container = document.getElementById(elementId);
  if (!container) return;

  // Create carousel cells
  products.forEach(product => {
    const cell = document.createElement("div");
    cell.className = "carousel-cell";

    cell.onclick = () => window.location.href = `/product-details.html?id=${product.id}`;
    cell.style.cursor = "pointer";

    cell.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="object-fit: contain; padding: 10px; background: white;">
            <div class="product-info">
                <p class="truncate-text" title="${product.title}">${product.title}</p>
                <span class="discount">₹${product.price}</span>
            </div>
        `;
    container.appendChild(cell);
  });

  // Initialize Flickity via JS
  if (window.Flickity) {
    new Flickity(container, {
      groupCells: true,
      cellAlign: 'left',
      contain: true,
      pageDots: false,
      wrapAround: true,
      autoPlay: 3000
    });
  }
}


function checkUserLoginStatus() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userInfo = document.getElementById('user-info');

  if (!userInfo) return;

  // Clear existing content to rebuild structure if needed, or just manipulate if structure exists.
  // Since we are updating HTML structure on all pages, we can expect specific IDs.
  // But to be safe and cleaner, let's inject the HTML structure here or expect it.
  // The user guide implies we change the navbar on each page.
  // Let's assume the HTML structure is already updated in HTML files or we inject it here?
  // Updating HTML files is cleaner.

  const signinLink = document.getElementById('signin-link');
  const loggedInDiv = document.getElementById('user-logged-in');

  // If structure doesn't exist yet (old pages), fallback or wait. 
  // But I will update HTML next.

  if (currentUser) {
    if (signinLink) signinLink.style.display = 'none';
    if (loggedInDiv) {
      loggedInDiv.style.display = 'block';

      // Setup Dropdown Toggle
      const btn = document.getElementById('user-dropdown-btn');
      const menu = document.getElementById('user-dropdown-menu');
      const logoutBtn = document.getElementById('logout-btn-action');

      if (btn && menu) {
        // Remove old listeners to avoid duplicates if re-run
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          menu.classList.toggle('show');
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
          if (!newBtn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('show');
          }
        });
      }

      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('currentUser');
          window.location.href = 'index.html';
        });
      }
    }
  } else {
    if (signinLink) signinLink.style.display = 'block';
    if (loggedInDiv) loggedInDiv.style.display = 'none';
  }
}


export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    cartCountEl.textContent = count;
    cartCountEl.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Global Search Logic
function setupGlobalSearch() {
  const searchForm = document.getElementById("search-form");
  if (!searchForm) return;

  searchForm.addEventListener("submit", (e) => {
    // If we are already on the product page, let product.js handle it (which prevents default)
    // However, product.js might load AFTER main.js, so we need to be careful.
    // Actually, safest is: if on product page, do nothing (let product.js handle).
    // If NOT on product page, prevent default and redirect.

    if (!window.location.pathname.includes('/product.html')) {
      e.preventDefault();
      const searchInput = document.getElementById("search-input");
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `/product.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', updateCartCount);
document.addEventListener('DOMContentLoaded', setupGlobalSearch);
window.addEventListener('storage', updateCartCount);
