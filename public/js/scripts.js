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

    if (prevSlide) prevSlide.addEventListener('click', prevSlideHandler);
    if (nextSlide) nextSlide.addEventListener('click', nextSlideHandler);
    if (slides.length > 0) {
        setInterval(nextSlideHandler, 3000);
        showSlide(slideIndex);
    }

    // Login Functionality
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
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
    }

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

    // --- FILTER, CATEGORY, PAGINATION LOGIC STARTS HERE ---

    // Elements
    const categoryTags = document.getElementById('categoryTags');
    const brandSelect = document.getElementById('brandSelect');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const inStockOnly = document.getElementById('inStockOnly');
    const searchInput = document.getElementById('mainSearchInput') || document.getElementById('searchInput');
    const searchForm = document.getElementById('mainSearchForm') || document.querySelector('.search-form');
    const productList = document.getElementById('product-list');
    const pagination = document.getElementById('pagination');

    let selectedCategoryId = null;
    let allCategories = [];
    let currentPage = 1;
    let totalPages = 1;

    // --- Category tags ---
    async function loadCategories() {
        try {
            const res = await fetch('/categories');
            const data = await res.json();
            allCategories = data.data || [];
            renderCategories();
        } catch {
            categoryTags.innerHTML = '<span style="color:red;">Categories loading error</span>';
        }
    }
    function renderCategories() {
        categoryTags.innerHTML = '';
        const allBtn = document.createElement('button');
        allBtn.className = 'filter-tag' + (selectedCategoryId === null ? ' active' : '');
        allBtn.textContent = 'All';
        allBtn.onclick = () => {
            selectedCategoryId = null;
            renderCategories();
            loadProducts(1);
        };
        categoryTags.appendChild(allBtn);

        allCategories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'filter-tag' + (selectedCategoryId === cat._id ? ' active' : '');
            btn.textContent = cat.name;
            btn.onclick = () => {
                selectedCategoryId = cat._id;
                renderCategories();
                loadProducts(1);
            };
            categoryTags.appendChild(btn);
        });
    }

    // --- Brand select rendering ---
    function renderBrands(brands) {
        brandSelect.innerHTML = '<option value="">All Brands</option>';
        brands.forEach(brand => {
            const opt = document.createElement('option');
            opt.value = brand;
            opt.textContent = brand;
            brandSelect.appendChild(opt);
        });
    }

    // --- Products rendering ---
    function renderProducts(products) {
        productList.innerHTML = '';
        if (!products.length) {
            productList.innerHTML = '<div class="product-card"><p>No products available</p></div>';
            return;
        }
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const imageUrl = product.images && product.images.length > 0
                ? `/uploads/products-images/${product._id}/${product.images[0]}`
                : '/images/default.jpg';
            card.innerHTML = `
                <a href="/product.html?id=${product._id}">
                    <img src="${imageUrl}" alt="${product.name || 'Product'}">
                    <h3>${product.name || 'Unnamed Product'}</h3>
                    <p class="price">$${product.price?.toFixed(2) || '0.00'}</p>
                </a>
                <button class="add-to-cart">Add to Cart</button>
            `;
            card.querySelector('.add-to-cart').onclick = (e) => {
                e.preventDefault();
                alert(`${product.name || 'Product'} added to cart!`);
            };
            productList.appendChild(card);
        });
    }

    // --- Pagination rendering ---
    function renderPagination(paginationObj) {
        pagination.innerHTML = '';
        if (!paginationObj || paginationObj.totalPages <= 1) return;

        // Prev btn
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '‹';
        prevBtn.disabled = paginationObj.page <= 1;
        prevBtn.onclick = () => loadProducts(paginationObj.page - 1);
        pagination.appendChild(prevBtn);

        // Page numbers (with ellipsis)
        for (let i = 1; i <= paginationObj.totalPages; i++) {
            if (
                i === 1 ||
                i === paginationObj.totalPages ||
                Math.abs(i - paginationObj.page) <= 1
            ) {
                const btn = document.createElement('button');
                btn.textContent = i;
                btn.disabled = i === paginationObj.page;
                btn.onclick = () => loadProducts(i);
                pagination.appendChild(btn);
            } else if (
                (i === paginationObj.page - 2 && i > 1) ||
                (i === paginationObj.page + 2 && i < paginationObj.totalPages)
            ) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.className = 'pagination-ellipsis';
                pagination.appendChild(ellipsis);
            }
        }

        // Next btn
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '›';
        nextBtn.disabled = paginationObj.page >= paginationObj.totalPages;
        nextBtn.onclick = () => loadProducts(paginationObj.page + 1);
        pagination.appendChild(nextBtn);
    }

    // --- Load and filter products (with pagination) ---
    async function loadProducts(page = 1) {
        const q = searchInput?.value.trim() || '';
        const brand = brandSelect.value;
        const maxPrice = priceRange.value;
        const inStock = inStockOnly.checked ? 'true' : '';
        const params = new URLSearchParams();
        if (selectedCategoryId) params.append('categoryId', selectedCategoryId);
        if (brand) params.append('brand', brand);
        if (q) params.append('q', q);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (inStock) params.append('inStock', inStock);
        params.append('page', page);
        params.append('limit', 10); // 10 tadan mahsulot

        try {
            const res = await fetch(`/products?${params.toString()}`);
            const data = await res.json();
            renderProducts(data.data || []);
            renderPagination(data.pagination || {page: 1, totalPages: 1});
            // Brand select options (from loaded page)
            const brands = [...new Set((data.data || []).map(p => p.brand).filter(Boolean))];
            renderBrands(brands);
        } catch {
            productList.innerHTML = '<div class="product-card"><p>Error loading products</p></div>';
        }
    }

    // --- Filter listeners ---
    priceRange.addEventListener('input', () => {
        priceValue.textContent = "$0 - $" + priceRange.value;
        loadProducts(1);
    });
    brandSelect.addEventListener('change', () => loadProducts(1));
    inStockOnly.addEventListener('change', () => loadProducts(1));
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loadProducts(1);
        });
    }

    // Initial
    priceValue.textContent = "$0 - $1000";
    priceRange.value = 1000;
    loadCategories();
    loadProducts(1);

    // --- Dashboard and Cart Logic (qoladi, o'zgarmaydi) ---
    if (window.location.pathname.includes('dashboard.html')) {
        const logoutButton = document.getElementById('logoutButton');
        const cartSection = document.getElementById('cartSection');
        const cartItems = document.getElementById('cartItems');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const cartLink = document.querySelector('.cart-link');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function updateCartCount() {
            const cartCount = document.getElementById('cartCount');
            if (cartCount) cartCount.textContent = cart.length;
        }

        function renderProductsDashboard() {
            loadProducts().then(() => {
                const productList = document.getElementById('dashboard-products');
                if (productList) {
                    productList.innerHTML = '';
                    fetch('http://localhost:3000/products')
                        .then(response => response.json())
                        .then(data => {
                            if (data.data && data.data.length > 0) {
                                data.data.forEach(product => {
                                    const card = document.createElement('div');
                                    card.className = 'product-card';
                                    const imageUrl = product.images && product.images.length > 0 
                                        ? `/uploads/products-images/${product._id}/${product.images[0]}`
                                        : '/images/default.jpg';
                                    fetch(imageUrl)
                                        .then(response => {
                                            if (!response.ok) {
                                                console.error('Image not found on server:', imageUrl);
                                            }
                                        })
                                        .catch(error => console.error('Fetch error:', error));
                                    card.innerHTML = `
                                        <img src="${imageUrl}" alt="${product.name || 'Product'}">
                                        <h3>${product.name || 'Unnamed Product'}</h3>
                                        <p class="price">$${product.price?.toFixed(2) || '0.00'}</p>
                                        <button class="add-to-cart" data-id="${product._id}">Add to Cart</button>
                                    `;
                                    productList.appendChild(card);
                                });
                                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                                addToCartButtons.forEach(button => {
                                    button.addEventListener('click', () => {
                                        const productId = button.getAttribute('data-id');
                                        const product = data.data.find(p => p._id === productId);
                                        cart.push(product);
                                        localStorage.setItem('cart', JSON.stringify(cart));
                                        updateCartCount();
                                        alert(`${product.name} added to cart!`);
                                    });
                                });
                            }
                        });
                }
            });
        }

        function renderCart() {
            if (cartItems) {
                cartItems.innerHTML = '';
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    const imageUrl = item.images && item.images.length > 0 
                        ? `/uploads/products-images/${item._id}/${item.images[0]}`
                        : '/images/default.jpg';
                    fetch(imageUrl)
                        .then(response => {
                            if (!response.ok) {
                                console.error('Image not found on server:', imageUrl);
                            }
                        })
                        .catch(error => console.error('Fetch error:', error));
                    cartItem.innerHTML = `
                        <img src="${imageUrl}" alt="${item.name || 'Product'}">
                        <h3>${item.name}</h3>
                        <p class="price">$${item.price?.toFixed(2) || '0.00'}</p>
                    `;
                    cartItems.appendChild(cartItem);
                });
                if (cartSection) cartSection.style.display = 'block';
            }
        }

        if (cartLink) {
            cartLink.addEventListener('click', () => {
                renderCart();
            });
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('cart');
                window.location.href = '/index.html';
            });
        }

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                alert('Checkout functionality to be implemented (e.g., payment gateway integration)');
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                if (cartSection) cartSection.style.display = 'none';
            });
        }

        renderProductsDashboard();
        updateCartCount();
    }
});