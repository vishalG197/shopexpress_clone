import"./reset-CJzo-h3_.js";/* empty css               */import"./main-CRS-uCLd.js";document.addEventListener("DOMContentLoaded",()=>{d(),c(),m(),p()});function d(){JSON.parse(localStorage.getItem("currentUser"))||(window.location.href="signin.html")}function c(){const t=JSON.parse(localStorage.getItem("currentUser"));t&&(document.getElementById("profile-name-display").textContent=t.name,document.getElementById("profile-email-display").textContent=t.email,document.getElementById("profile-avatar-initial").textContent=t.name.charAt(0).toUpperCase())}function m(){const t=JSON.parse(localStorage.getItem("currentUser")),n=document.getElementById("orders-list"),i=(JSON.parse(localStorage.getItem("orders"))||[]).filter(e=>e.shipping&&e.shipping.email===t.email);if(i.sort((e,o)=>new Date(o.date)-new Date(e.date)),i.length===0){n.innerHTML=`
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>No orders found</h3>
                <p>Looks like you haven't placed any orders yet.</p>
                <a href="product.html" class="auth-btn" style="display:inline-block; margin-top:1rem; text-decoration:none; width:auto;">Start Shopping</a>
            </div>
        `;return}n.innerHTML="",i.forEach(e=>{const o=new Date(e.date).toLocaleDateString();let a="";e.items.slice(0,4).forEach(s=>{const l=s.image;a+=`<img src="${l}" alt="${s.title}" class="preview-img" title="${s.title}">`}),e.items.length>4&&(a+=`<div class="preview-img" style="display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-size:0.8rem;font-weight:600;">+${e.items.length-4}</div>`);const r=document.createElement("div");r.className="order-card",r.style.cursor="pointer",r.addEventListener("click",()=>{window.location.href=`order-details.html?id=${e.orderId}`}),r.innerHTML=`
            <div class="order-header">
                <div>
                    <div class="order-id">${e.orderId}</div>
                    <div class="order-date">Placed on ${o}</div>
                </div>
                <div class="order-status status-pending">Pending</div>
            </div>
            <div class="order-items-preview">
                ${a}
            </div>
            <div class="order-footer">
                <div>${e.items.length} items</div>
                <div class="order-total">Total: ₹${e.total}</div>
            </div>
        `,n.appendChild(r)})}function p(){const t=document.getElementById("profile-logout-btn");t&&t.addEventListener("click",n=>{n.preventDefault(),localStorage.removeItem("currentUser"),window.location.href="index.html"})}
