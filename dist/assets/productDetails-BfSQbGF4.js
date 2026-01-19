import"./reset-CJzo-h3_.js";/* empty css               */import{u as c}from"./main-CRS-uCLd.js";import{s}from"./notification-DfkSIDvh.js";let n=JSON.parse(localStorage.getItem("cart"))||[];document.addEventListener("DOMContentLoaded",()=>{const e=new URLSearchParams(window.location.search).get("id");e?d(e):o("Invalid Product ID.")});async function d(t){try{const e=await fetch(`https://fakestoreapi.com/products/${t}`);if(!e.ok)throw new Error("Product not found");const a=await e.json();a?u(a):o("Product not found.")}catch(e){console.error("Error fetching product:",e),o("Failed to load product details.")}}function u(t){const e=document.getElementById("details-container"),a=t.originalPrice||Math.floor(t.price*1.2);e.innerHTML=`
        <div class="product-detail-wrapper">
            <div class="detail-image-container">
                <img src="${t.image}" alt="${t.title}" class="detail-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/500?text=No+Image'">
            </div>
            <div class="detail-info">
                <span class="detail-category">${t.category||"General"}</span>
                <h1 class="detail-title">${t.title}</h1>
                
                <div class="detail-price">
                    ₹${t.price}
                    <span class="original-price">₹${a}</span>
                </div>

                <p class="detail-description">
                    ${t.description||"Experience premium quality with this generic product description. It fulfills all your needs with style and durability."}
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
    `,m(),document.getElementById("add-btn").addEventListener("click",()=>r(t)),document.getElementById("buy-btn").addEventListener("click",()=>{r(t),setTimeout(()=>window.location.href="/cart.html",500)})}function m(){const t=document.getElementById("qty-minus"),e=document.getElementById("qty-plus"),a=document.getElementById("qty-input");!t||!e||!a||(t.addEventListener("click",()=>{let i=parseInt(a.value);i>1&&(a.value=i-1)}),e.addEventListener("click",()=>{let i=parseInt(a.value);i<10&&(a.value=i+1)}))}function r(t){n=JSON.parse(localStorage.getItem("cart"))||[];const e=document.getElementById("qty-input"),a=e?parseInt(e.value):1,i=n.findIndex(l=>l.id===t.id);i>-1?(n[i].quantity+=a,s(`Updated cart quantity to ${n[i].quantity}!`,"success")):(n.push({...t,quantity:a}),s("Product added to cart!","success")),localStorage.setItem("cart",JSON.stringify(n)),window.dispatchEvent(new Event("storage")),c()}function o(t){document.getElementById("details-container").innerHTML=`
        <div class="loading-state">
            <i class="fa-solid fa-circle-exclamation" style="font-size: 2rem; margin-bottom: 1rem; color: var(--secondary-color);"></i>
            <p>${t}</p>
            <a href="/product.html" style="color: var(--primary-color); text-decoration: underline; margin-top: 1rem; display: block;">Back to Products</a>
        </div>
    `}
