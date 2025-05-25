let cart = JSON.parse(localStorage.getItem('cart')) || [];
let discount = 0;

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    updateCartTotals();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCartItems();
            updateCartTotals();
        }
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" onclick="removeFromCart('${item.id}')"><i class="far fa-times-circle" style="color: #088178;"></i></a></td>
            <td><img src="${item.image}" alt="${item.name}" style="width: 80px;"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
    });
}

function updateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal - discount;
    
    const subtotalElement = document.getElementById('cart-subtotal');
    const discountElement = document.getElementById('discount-amount');
    const totalElement = document.getElementById('cart-total');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (discountElement) discountElement.textContent = `-$${discount.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

function applyCoupon() {
    const couponInput = document.getElementById('coupon-input');
    const couponCode = couponInput.value.trim().toUpperCase();
    
    if (couponCode === 'SPRINTS10') {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        discount = subtotal * 0.1;
        alert('Coupon applied! 10% discount');
    } else if (couponCode === 'OMAR20') {
        discount = 20;
        alert('Coupon applied! $20 off');
    } else {
        alert('Invalid coupon code');
        return;
    }
    
    updateCartTotals();
    couponInput.value = '';
}

function showReceipt() {
    const modal = document.getElementById('receipt-modal');
    const receiptItems = document.getElementById('receipt-items');
    const receiptTotal = document.getElementById('receipt-total');
    
    let itemsHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        itemsHTML += `
            <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    const total = subtotal - discount;
    
    receiptItems.innerHTML = itemsHTML;
    receiptTotal.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>Discount:</span>
            <span>-$${discount.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>Shipping:</span>
            <span>Free</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 18px;">
            <strong>Total: $${total.toFixed(2)}</strong>
        </div>
    `;
    
    modal.style.display = 'block';
}

function completePurchase() {
    alert('Thank you for choosing Sprints!');
    cart = [];
    discount = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    document.getElementById('receipt-modal').style.display = 'none';
    displayCartItems();
    updateCartTotals();
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Initialize cart page elements 
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
        updateCartTotals();
        
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', showReceipt);
        }
        
        const applyCouponBtn = document.getElementById('apply-coupon');
        if (applyCouponBtn) {
            applyCouponBtn.addEventListener('click', applyCoupon);
        }
        
        const completePurchaseBtn = document.getElementById('complete-purchase');
        if (completePurchaseBtn) {
            completePurchaseBtn.addEventListener('click', completePurchase);
        }
        
        const closeModal = document.querySelector('.close');
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                document.getElementById('receipt-modal').style.display = 'none';
            });
        }
    }
    
    // Add to Cart buttons on product cards
    const cartButtons = document.querySelectorAll('.cart');
    cartButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productElement = this.closest('.pro');
            if (productElement) {
                const product = {
                    id: 'product_' + index,
                    name: productElement.querySelector('h5').textContent,
                    price: parseFloat(productElement.querySelector('h4').textContent.replace('$', '')),
                    image: productElement.querySelector('img').src,
                    brand: productElement.querySelector('span').textContent
                };
                addToCart(product);
            }
        });
    });
    
    // Handle cart icon in navbar separately
    const cartLinks = document.querySelectorAll('.cart-link');
    cartLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
        });
    });
});



// discount cupons  OMAR20  , SPRINTS10