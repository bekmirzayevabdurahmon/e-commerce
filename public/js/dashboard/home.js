document.addEventListener('DOMContentLoaded', async function () {
    const messageDiv = document.getElementById('message');
    const categoriesList = document.getElementById('categoriesList');
    const productsList = document.getElementById('productsList');

    // Kategoriyalarni olish
    try {
        const categoriesResponse = await fetch('/api/categories', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        const categoriesResult = await categoriesResponse.json();

        if (categoriesResponse.ok) {
            categoriesList.innerHTML = categoriesResult.data.map(category => `
                <div class="category-item">
                    <h3>${category.name}</h3>
                </div>
            `).join('');
        } else {
            messageDiv.textContent = categoriesResult.message || 'Failed to load categories.';
            messageDiv.style.color = '#ef4444';
            messageDiv.classList.add('show');
        }
    } catch (error) {
        messageDiv.textContent = 'An error occurred while loading categories.';
        messageDiv.style.color = '#ef4444';
        messageDiv.classList.add('show');
    }

    // Mahsulotlarni olish
    try {
        const productsResponse = await fetch('/api/products?popular=true', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        const productsResult = await productsResponse.json();

        if (productsResponse.ok) {
            productsList.innerHTML = productsResult.data.map(product => `
                <div class="product-item">
                    <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description || 'No description available'}</p>
                    <div class="price">$${product.price}</div>
                    <button class="add-to-cart" data-id="${product._id}">Add to Cart</button>
                </div>
            `).join('');
        } else {
            messageDiv.textContent = productsResult.message || 'Failed to load products.';
            messageDiv.style.color = '#ef4444';
            messageDiv.classList.add('show');
        }
    } catch (error) {
        messageDiv.textContent = 'An error occurred while loading products.';
        messageDiv.style.color = '#ef4444';
        messageDiv.classList.add('show');
    }

    // Qidiruv funksiyasi
    document.getElementById('searchButton').addEventListener('click', async function () {
        const query = document.getElementById('searchInput').value.trim();
        if (!query) return;

        try {
            const searchResponse = await fetch(`/api/products?search=${encodeURIComponent(query)}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const searchResult = await searchResponse.json();

            if (searchResponse.ok) {
                productsList.innerHTML = searchResult.data.map(product => `
                    <div class="product-item">
                        <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description || 'No description available'}</p>
                        <div class="price">$${product.price}</div>
                        <button class="add-to-cart" data-id="${product._id}">Add to Cart</button>
                    </div>
                `).join('');
            } else {
                messageDiv.textContent = searchResult.message || 'No products found.';
                messageDiv.style.color = '#ef4444';
                messageDiv.classList.add('show');
            }
        } catch (error) {
            messageDiv.textContent = 'An error occurred while searching.';
            messageDiv.style.color = '#ef4444';
            messageDiv.classList.add('show');
        }
    });

    // Savatga qo‘shish
    productsList.addEventListener('click', async function (e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.id;

            try {
                const response = await fetch('/api/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify({ productId, quantity: 1 })
                });

                const result = await response.json();

                if (response.ok) {
                    messageDiv.textContent = 'Product added to cart!';
                    messageDiv.style.color = '#10b981';
                    messageDiv.classList.add('show');
                    setTimeout(() => {
                        messageDiv.classList.remove('show');
                    }, 2000);
                } else {
                    messageDiv.textContent = result.message || 'Failed to add to cart.';
                    messageDiv.style.color = '#ef4444';
                    messageDiv.classList.add('show');
                }
            } catch (error) {
                messageDiv.textContent = 'An error occurred while adding to cart.';
                messageDiv.style.color = '#ef4444';
                messageDiv.classList.add('show');
            }
        }
    });

    // Logout funksiyasi
    document.getElementById('logoutButton').addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        window.location.href = 'login.html';
    });
}); 