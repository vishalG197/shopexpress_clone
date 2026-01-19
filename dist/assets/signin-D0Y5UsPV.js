import"./reset-CJzo-h3_.js";/* empty css               *//* empty css             */document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("form");e&&e.addEventListener("submit",i)});function i(e){e.preventDefault();const t=document.getElementById("email"),a=document.getElementById("password"),s=t.value,c=a.value,n=(JSON.parse(localStorage.getItem("User-data"))||[]).find(o=>o.Email===s&&o.Password===c);n?(localStorage.setItem("currentUser",JSON.stringify({name:n.Name,email:n.Email})),d(n.Name)):alert("Invalid email or password. Please try again.")}function d(e){const t=document.createElement("div");t.className="success-modal",t.innerHTML=`
        <div class="success-content">
            <i class="fa-solid fa-circle-check"></i>
            <h2>Login Successful!</h2>
            <p>Welcome back, ${e}!</p>
            <button id="continue-btn">Continue Shopping</button>
        </div>
    `,document.body.appendChild(t),document.getElementById("continue-btn").addEventListener("click",()=>{window.location.href="/"})}
