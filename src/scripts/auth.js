document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', handleLogin);
    }
});

function handleLogin(e) {
    e.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value;
    const password = passwordInput.value;

    const userData = JSON.parse(localStorage.getItem("User-data")) || [];
    // We don't really need to store "Usersighin" separate from session, but following existing pattern partially for now

    // Find the matching user
    const user = userData.find(u => u.Email === email && u.Password === password);

    if (user) {
        // Store current user data
        localStorage.setItem("currentUser", JSON.stringify({
            name: user.Name,
            email: user.Email
        }));

        // Show success modal
        showSuccessModal(user.Name);
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

function showSuccessModal(userName) {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-content">
            <i class="fa-solid fa-circle-check"></i>
            <h2>Login Successful!</h2>
            <p>Welcome back, ${userName}!</p>
            <button id="continue-btn">Continue Shopping</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('continue-btn').addEventListener('click', () => {
        window.location.href = "/";
    });
}
