import"./reset-CJzo-h3_.js";/* empty css               *//* empty css             */document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("form");e&&e.addEventListener("submit",u)});function u(e){e.preventDefault();const t=document.getElementById("name"),c=document.getElementById("email"),d=document.getElementById("password"),i=document.getElementById("confirm-password"),o=t.value,s=c.value,a=d.value,r=i.value;if(a!==r){alert("Passwords do not match!");return}const n=JSON.parse(localStorage.getItem("User-data"))||[];if(n.some(l=>l.Email===s)){alert("An account with this email already exists.");return}const m={Name:o,Email:s,Password:a};n.push(m),localStorage.setItem("User-data",JSON.stringify(n)),p(o)}function p(e){const t=document.createElement("div");t.className="success-modal",t.innerHTML=`
        <div class="success-content">
            <i class="fa-solid fa-circle-check"></i>
            <h2>Registration Successful!</h2>
            <p>Welcome to ShopExpress, ${e}!</p>
            <button id="login-redirect-btn">Continue to Login</button>
        </div>
    `,document.body.appendChild(t),document.getElementById("login-redirect-btn").addEventListener("click",()=>{window.location.href="signin.html"})}
