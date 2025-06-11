document.addEventListener('DOMContentLoaded', () => {
    // Banner Slider
    let slideIndex = 0;
    const slides = document.querySelectorAll('.banner-slide');
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');

    function showSlide(index) {
        if (index >= slides.length) slideIndex = 0;
        if (index < 0) slideIndex = slides.length - 1;
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === slideIndex) slide.classList.add('active');
        });
    }

    function nextSlideHandler() {
        slideIndex++;
        showSlide(slideIndex);
    }

    function prevSlideHandler() {
        slideIndex--;
        showSlide(slideIndex);
    }

    prevSlide.addEventListener('click', prevSlideHandler);
    nextSlide.addEventListener('click', nextSlideHandler);
    setInterval(nextSlideHandler, 3000);
    showSlide(slideIndex);

    // Login Functionality
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', async () => {
        const email = prompt('Enter your email:');
        const password = prompt('Enter your password:');

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Login successful!');
                window.location.href = '/dashboard.html';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }

    // Load Dark Mode from Local Storage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Load Products
    loadProducts();

    // Dashboard and Cart Logic
    if (window.location.pathname.includes('dashboard.html')) {
        const logoutButton = document.getElementById('logoutButton');
        const cartSection = document.getElementById('cartSection');
        const cartItems = document.getElementById('cartItems');
        const checkoutBtn = document.getElementById('checkoutBtn');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function updateCartCount() {
            document.getElementById('cartCount').textContent = cart.length;
        }

        function renderProducts() {
            loadProducts().then(() => {
                const productList = document.getElementById('dashboard-products');
                productList.innerHTML = '';
                fetch('http://localhost:3000/products')
                    .then(response => response.json())
                    .then(data => {
                        if (data.data && data.data.length > 0) {
                            data.data.forEach(product => {
                                const card = document.createElement('div');
                                card.className = 'product-card';
                                card.innerHTML = `
                                    <img src="${product.images[0] || '/images/default.jpg'}" alt="${product.name || 'Product'}">
                                    <h3>${product.name || 'Unnamed Product'}</h3>
                                    <p class="price">$${product.price?.toFixed(2) || '0.00'}</p>
                                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                                `;
                                productList.appendChild(card);
                            });
                            document.querySelectorAll('.add-to-cart').forEach(button => {
                                button.addEventListener('click', () => {
                                    const productId = button.getAttribute('data-id');
                                    const product = data.data.find(p => p.id === productId);
                                    cart.push(product);
                                    localStorage.setItem('cart', JSON.stringify(cart));
                                    updateCartCount();
                                    alert(`${product.name} added to cart!`);
                                });
                            });
                        }
                    });
            });
        }

        function renderCart() {
            cartItems.innerHTML = '';
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price?.toFixed(2) || '0.00'}</p>
                `;
                cartItems.appendChild(cartItem);
            });
            cartSection.style.display = 'block';
        }

        document.querySelector('.cart-link').addEventListener('click', () => {
            renderCart();
        });

        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('cart');
            window.location.href = '/index.html';
        });

        checkoutBtn.addEventListener('click', () => {
            alert('Checkout functionality to be implemented (e.g., payment gateway integration)');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            cartSection.style.display = 'none';
        });

        renderProducts();
        updateCartCount();
    }
});

async function loadProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Oldingi kontentni tozalash

        if (data.data && data.data.length > 0) {
            data.data.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${product.images[0] || '/images/default.jpg'}" alt="${product.name || 'Product'}">
                    <h3>${product.name || 'Unnamed Product'}</h3>
                    <p class="price">$${product.price?.toFixed(2) || '0.00'}</p>
                `;
                productList.appendChild(card);
            });
        } else {
            productList.innerHTML = '<div class="product-card"><p>No products available</p></div>';
        }
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('product-list').innerHTML = '<div class="product-card"><p>Error loading products</p></div>';
    }
}