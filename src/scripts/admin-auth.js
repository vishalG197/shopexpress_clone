// Admin Authentication Logic

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const admins = JSON.parse(localStorage.getItem('admin-data')) || [];

    // Check against stored admins
    const admin = admins.find(a => a.email === email && a.password === password);

    if (admin) {
        // Set session
        localStorage.setItem('adminSession', JSON.stringify(admin));
        window.location.href = 'productlist.html';
    } else {
        alert('Invalid credentials!');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }

    const admins = JSON.parse(localStorage.getItem('admin-data')) || [];

    // Check if exists
    if (admins.some(a => a.email === email)) {
        alert('Admin already exists!');
        return;
    }

    admins.push({ name, email, password });
    localStorage.setItem('admin-data', JSON.stringify(admins));

    alert('Registration successful! Please login.');
    window.location.href = 'Admin.html';
}

// Check auth status for protected pages
export function checkAdminAuth() {
    const session = localStorage.getItem('adminSession');
    if (!session && !window.location.href.includes('Admin.html') && !window.location.href.includes('adminregister.html')) {
        window.location.href = 'Admin.html';
    }
}
