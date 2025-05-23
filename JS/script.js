// Check which page we're on and run the appropriate code

document.addEventListener('DOMContentLoaded', function() {

    // Sign-up page logic

    const signupForm = document.querySelector('#signup-form form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const fullName = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password === confirmPassword) {
                const data = {
                    fullName: fullName,
                    email: email,
                    password: password
                };
                localStorage.setItem('userData', JSON.stringify(data));
                
                window.location.href = 'html/login.html';
            } else {
                alert('Passwords do not match!');
            }
        });
    }

    // Login page logic
    const loginForm = document.querySelector('#login-form form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const storedData = JSON.parse(localStorage.getItem('userData'));

            if (storedData && storedData.email === email && storedData.password === password) {
                window.location.href = 'home.html';
            } else {
                alert('Invalid email or password!');
            }
        });
    }
    
    // Logout 
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            localStorage.removeItem('userData');
            
            window.location.href = '../index.html';
        });
    }

    function addProductToCart(button) {
        const productDiv = button.closest('.pro');
        const product = {
            id: productDiv.dataset.id,
            name: productDiv.dataset.name,
            price: parseFloat(productDiv.dataset.price),
            image: productDiv.dataset.image
        };
        
        addToCart(product);
        alert('Product added to cart!');
    }
    
    // Initialize cart when page loads
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize cart count
        updateCartCount();
    });
});