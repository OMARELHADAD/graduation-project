E-Commerce Graduation Project Documentation

  Overview
    This project is a simple e-commerce web application built with HTML, CSS, and JavaScript.
    It allows users to register, log in, browse products, add items to a shopping cart, apply discount coupons, and complete purchases.
    All data is stored in the browser's localStorage.

Main Features
  1. User Registration & Login
Sign Up:
  Users can create an account by providing their name, email, and password. Data is saved in localStorage under the key userData.
Login:
  Users log in with their email and password. Credentials are checked against localStorage.
2. Product Browsing
  Products are displayed on home.html, shop.html, and shoe.html.
  Each product card shows an image, name, brand, price, and a star rating.
3. Shopping Cart
  Users can add products to the cart from product pages.
  The cart is stored in localStorage under the key cart.
  Cart page (cart.html) allows users to:
  View, update, or remove items
  See subtotal, discounts, and total
  Apply coupon codes (SPRINTS10 for 10% off, OMAR20 for $20 off)
  Complete purchase (clears the cart)
4. Responsive Design
  The site uses responsive CSS for usability on different devices.


Key Files
  index.html: Registration page
  html/login.html: Login page
  html/home.html: Main product listing
  html/cart.html: Shopping cart and checkout
  JS/script.js: Handles registration, login, and navigation logic
  JS/cart.js: Handles cart operations, coupon logic, and checkout


How Data is Stored
  User Data:
    localStorage.setItem('userData', JSON.stringify({fullName, email, password}))
  Cart Data:
    localStorage.setItem('cart', JSON.stringify(cartArray))



How to Run

  1-Open index.html in your browser to register a new account.
  2-After registration, you are redirected to the login page.
  3-Log in to access the shop and cart features.
  4-Browse products, add to cart, and checkout.


Notes

  *********** i made the website responsive using media queries but when the submission deadline got extended i added the shoe.html and made it responsive using bootstrap ***********
  Coupon codes: SPRINTS10 (10% off), OMAR20 ($20 off).
  Authors
  Omar Elhadad
  Sprints Graduation Project

  

