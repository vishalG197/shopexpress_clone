import"./reset-CJzo-h3_.js";/* empty css               */import{u}from"./main-CRS-uCLd.js";import{s as y}from"./notification-DfkSIDvh.js";let a=JSON.parse(localStorage.getItem("cart"))||[];const r=document.querySelector(".cart-items"),i=document.querySelector(".empty-cart"),f=document.querySelectorAll("#cart-total"),s=document.getElementById("buy"),l=document.getElementById("clear-cart-btn");document.addEventListener("DOMContentLoaded",()=>{c(),s&&s.addEventListener("click",v),l&&l.addEventListener("click",g)});function c(){if(a=JSON.parse(localStorage.getItem("cart"))||[],!(!r||!i)){if(a.length===0){r.parentElement.style.display="none",document.querySelector(".cart-summary")&&(document.querySelector(".cart-summary").style.display="none"),i.style.display="block";return}r.parentElement.style.display="block",document.querySelector(".cart-summary")&&(document.querySelector(".cart-summary").style.display="block"),i.style.display="none",r.innerHTML=a.map(t=>{const e=t.image.includes("cdn.shopclues.com")?"https://images.unsplash.com/photo-1593998066526-65fcab3021a2?w=200&q=80":t.image;return`
        <div class="cart-item" data-id="${t.id}">
             <img src="${e}" alt="${t.title}" class="item-image">
            <div class="item-details">
                <h3 class="item-name">${t.title}</h3>
                <p class="item-price">₹${t.price}</p>
            </div>
            <div class="item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn decrement" data-id="${t.id}" aria-label="Decrease quantity">-</button>
                    <span class="quantity-display">${t.quantity}</span>
                    <button class="quantity-btn increment" data-id="${t.id}" aria-label="Increase quantity">+</button>
                </div>
                 <button class="remove-btn" data-id="${t.id}" aria-label="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `}).join(""),p(),q()}}function p(){document.querySelectorAll(".decrement").forEach(t=>{t.addEventListener("click",()=>d(parseInt(t.dataset.id),"decrease"))}),document.querySelectorAll(".increment").forEach(t=>{t.addEventListener("click",()=>d(parseInt(t.dataset.id),"increase"))}),document.querySelectorAll(".remove-btn").forEach(t=>{t.addEventListener("click",()=>h(parseInt(t.dataset.id)))})}function d(t,e){const n=a.find(m=>m.id===t);n&&(e==="increase"?n.quantity++:e==="decrease"&&n.quantity>1&&n.quantity--,o(),c())}function h(t){confirm("Are you sure you want to remove this item?")&&(a=a.filter(e=>e.id!==t),o(),c(),u())}function q(){const t=a.reduce((e,n)=>e+n.price*n.quantity,0);f.forEach(e=>{e.textContent=t.toFixed(2)})}function g(){confirm("Are you sure you want to clear your entire cart?")&&(a=[],o(),c(),u(),y("Cart cleared!","info"))}function o(){localStorage.setItem("cart",JSON.stringify(a))}function v(){JSON.parse(localStorage.getItem("currentUser"))?window.location.href="checkout.html":confirm("You need to sign in to proceed. Go to login page?")&&(window.location.href="signin.html")}
