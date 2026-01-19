document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', handleRegister);
    }
});

function handleRegister(e) {
    e.preventDefault();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const userData = JSON.parse(localStorage.getItem("User-data")) || [];

    // Check if user already exists
    if (userData.some(u => u.Email === email)) {
        alert("An account with this email already exists.");
        return;
    }

    const newUser = {
        Name: name,
        Email: email,
        Password: password
    };

    userData.push(newUser);
    localStorage.setItem("User-data", JSON.stringify(userData));

    showSuccessModal(name);
}

function showSuccessModal(userName) {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-content">
            <i class="fa-solid fa-circle-check"></i>
            <h2>Registration Successful!</h2>
            <p>Welcome to ShopExpress, ${userName}!</p>
            <button id="login-redirect-btn">Continue to Login</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('login-redirect-btn').addEventListener('click', () => {
        window.location.href = "signin.html";
    });
}
