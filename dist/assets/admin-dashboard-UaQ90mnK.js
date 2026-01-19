import{c as l}from"./admin-auth-CG9ZKg7P.js";document.addEventListener("DOMContentLoaded",()=>{l(),window.location.pathname.includes("productlist.html")||window.location.pathname==="/productlist.html"?u():(window.location.pathname.includes("order.html")||window.location.pathname==="/order.html")&&f(),s()});function s(){const n=document.getElementById("logout-btn");n&&n.addEventListener("click",t=>{t.preventDefault(),localStorage.removeItem("adminSession"),window.location.href="Admin.html"})}function u(){r();const n=document.getElementById("add-product-form");n&&n.addEventListener("submit",p)}async function r(){if(!document.getElementById("product-table-body"))return;let t=JSON.parse(localStorage.getItem("products"));if(!t)try{t=await(await fetch("/Data.json")).json(),localStorage.setItem("products",JSON.stringify(t))}catch(e){console.error(e),t=[]}m(t)}function m(n){const t=document.getElementById("product-table-body");t.innerHTML="",n.forEach((e,o)=>{const d=document.createElement("tr");d.innerHTML=`
            <td>${e.id}</td>
            <td>
                <img src="${e.image}" alt="" style="width: 40px; height: 40px; object-fit: contain;">
                ${e.title}
            </td>
            <td>₹${e.price}</td>
            <td>${e.category}</td>
            <td>
                <button class="action-btn btn-danger" data-id="${e.id}">Delete</button>
            </td>
        `,d.querySelector(".btn-danger").addEventListener("click",()=>g(e.id)),t.appendChild(d)})}function p(n){n.preventDefault();const t=document.getElementById("id").value,e=document.getElementById("title").value,o=document.getElementById("price").value,d=document.getElementById("category").value,i=document.getElementById("image").value;if(!t||!e||!o){alert("Please fill at least ID, Title and Price");return}const a=JSON.parse(localStorage.getItem("products"))||[];if(a.some(c=>c.id==t)){alert("Product ID already exists!");return}a.push({id:parseInt(t),title:e,price:parseFloat(o),category:d,image:i}),localStorage.setItem("products",JSON.stringify(a)),alert("Product added!"),n.target.reset(),r()}function g(n){if(confirm("Are you sure you want to delete this product?")){let t=JSON.parse(localStorage.getItem("products"))||[];t=t.filter(e=>e.id!==n),localStorage.setItem("products",JSON.stringify(t)),r()}}function f(){y()}function y(){if(!document.getElementById("order-table-body"))return;const t=JSON.parse(localStorage.getItem("orders"))||[];t.sort((e,o)=>new Date(o.date)-new Date(e.date)),h(t)}function h(n){const t=document.getElementById("order-table-body");if(t.innerHTML="",n.length===0){t.innerHTML='<tr><td colspan="7" style="text-align:center;">No orders found</td></tr>';return}n.forEach(e=>{const o=document.createElement("tr"),d=new Date(e.date).toLocaleDateString();o.innerHTML=`
            <td>${e.orderId||"N/A"}</td>
            <td>${d}</td>
            <td>${e.shipping.firstName} ${e.shipping.lastName}</td>
            <td>${e.shipping.city}, ${e.shipping.zip}</td>
            <td>₹${e.total}</td>
            <td><span style="background:#dbeafe; color:#1e40af; padding:0.25rem 0.5rem; borderRadius:4px; font-size:0.85rem;">Pending</span></td>
            <td>
                <button class="action-btn btn-success" onclick="alert('Order marked as shipped!')">Ship</button>
            </td>
        `,t.appendChild(o)})}
