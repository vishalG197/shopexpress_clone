import { showToast } from './notification.js';

document.addEventListener('DOMContentLoaded', function () {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.querySelector('.order-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const paymentOptions = document.querySelectorAll('.payment-option');

    // Check if cart is empty
    if (cartItems.length === 0) {
        showToast('Your cart is empty. Redirecting...', 'info');
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 1500);
        return;
    }

    // Display cart items in order summary
    function displayCartItems() {
        orderItemsContainer.innerHTML = '';
        let subtotal = 0;

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';

            // Use Unsplash placeholder if URL is from old CDN
            const imageUrl = item.image.includes('cdn.shopclues.com')
                ? `https://images.unsplash.com/photo-1593998066526-65fcab3021a2?w=100&q=80`
                : item.image;

            itemElement.innerHTML = `
                <div class="item-info">
                    <img src="${imageUrl}" alt="${item.title}" class="item-image">
                    <div>
                        <div class="item-name">${item.title}</div>
                        <div class="item-quantity">Qty: ${item.quantity}</div>
                    </div>
                </div>
                <div class="item-price">₹${(item.price * item.quantity)}</div>
            `;
            orderItemsContainer.appendChild(itemElement);
            subtotal += item.price * item.quantity;
        });

        subtotalElement.textContent = `₹${subtotal}`;
        totalElement.textContent = `₹${subtotal}`;
    }

    const creditCardForm = document.getElementById('credit-card-form');

    // Initial State: Disable button
    placeOrderBtn.disabled = true;

    // Handle payment option selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', function () {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            const method = this.dataset.method;
            if (method === 'credit-card') {
                creditCardForm.classList.remove('hidden');
            } else {
                creditCardForm.classList.add('hidden');
            }
            validateForm(); // Re-validate on switch
        });
    });

    // Input Formatting (Card Number & Expiry)
    const cardNumberInput = document.getElementById('cardNumber');
    const cardExpiryInput = document.getElementById('cardExpiry');
    const cardCvvInput = document.getElementById('cardCvv');

    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            value = value.substring(0, 16); // Limit to 16 digits
            // Add spaces every 4 digits
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
            validateForm();
        });
    }

    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
            validateForm();
        });
    }

    if (cardCvvInput) {
        cardCvvInput.addEventListener('input', () => validateForm());
    }

    // Add input listeners to all required fields for real-time validation
    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.addEventListener('input', validateForm);
        input.addEventListener('change', validateForm);
    });

    // Validation Logic
    function validateForm() {
        const requiredIds = ['firstName', 'lastName', 'email', 'address', 'city', 'zip', 'country'];
        let isValid = true;

        // 1. Validate Shipping Info
        requiredIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el.value.trim()) {
                isValid = false;
                // Optional: visual cue only on blur? For now keeps it simple
            }
        });

        // 2. Validate Email Regex
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) isValid = false;

        // 3. Validate Credit Card (if selected)
        const selectedMethod = document.querySelector('.payment-option.active').dataset.method;
        if (selectedMethod === 'credit-card') {
            const cardName = document.getElementById('cardName').value.trim();
            const cardNum = document.getElementById('cardNumber').value.replace(/\s/g, '');
            const cardExp = document.getElementById('cardExpiry').value;
            const cardCvv = document.getElementById('cardCvv').value;

            if (!cardName) isValid = false;
            // Simple checks: 16 digits, 3 digits CVV, valid date format length
            if (cardNum.length !== 16) isValid = false;
            if (cardCvv.length !== 3) isValid = false;
            if (cardExp.length !== 5) isValid = false;
        }

        // Toggle Button
        placeOrderBtn.disabled = !isValid;
        return isValid;
    }

    // Generate unique order ID
    function generateOrderId() {
        return 'ORD-' + Date.now().toString(36).toUpperCase();
    }

    // Simulate payment processing
    function processPayment(paymentMethod) {
        return new Promise((resolve, reject) => {
            // Show loading state
            placeOrderBtn.classList.add('loading');
            placeOrderBtn.disabled = true;
            placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            setTimeout(() => {
                // Simulate success
                resolve();
            }, 1500);
        });
    }

    // Handle order placement
    async function placeOrder() {
        if (!validateForm()) return;

        const selectedPayment = document.querySelector('.payment-option.active').dataset.method;

        try {
            await processPayment(selectedPayment);

            const order = {
                items: cartItems,
                shipping: {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    zip: document.getElementById('zip').value,
                    country: document.getElementById('country').value
                },
                paymentMethod: selectedPayment,
                total: parseFloat(totalElement.textContent.replace('₹', '')),
                date: new Date().toISOString(),
                orderId: generateOrderId()
            };

            // Save order to localStorage
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Clear cart
            localStorage.removeItem('cart');

            // Show success modal
            showModal(order.orderId);

        } catch (error) {
            showToast('Payment failed. Please try again.', 'error');
            placeOrderBtn.classList.remove('loading');
            placeOrderBtn.disabled = false;
            placeOrderBtn.innerHTML = 'Place Order';
        }
    }

    // Attach event listener
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function (e) {
            if (placeOrderBtn.disabled) return;
            e.preventDefault();
            placeOrder();
        });
    }

    // Initialize
    displayCartItems();

    // Modal Close Logic
    const closeModalBtn = document.getElementById('close-modal-btn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function () {
            const modal = document.getElementById('orderModal');
            modal.style.display = 'none';
            window.location.href = '/';
        });
    }
});

function showModal(orderId) {
    const modal = document.getElementById('orderModal');
    const orderIdElement = document.getElementById('modalOrderId');
    if (orderIdElement) orderIdElement.textContent = `Order ID: ${orderId}`;
    modal.style.display = 'flex';
}
