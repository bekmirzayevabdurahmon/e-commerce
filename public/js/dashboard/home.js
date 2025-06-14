let userId = null;
let allProducts = [];
let allCategories = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedCategory = null;

// Foydalanuvchi ma'lumotini olish
async function getUserInfo() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch('/users/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return;
        const user = await res.json();
        userId = user.data?._id || user._id;
        const usernameEl = document.getElementById('username');
        if (usernameEl) usernameEl.textContent = user.data?.name || user.data?.email || '';
    } catch {}
}

// Kategoriyalarni yuklash va filterlarni chiqarish
async function loadCategories() {
    try {
        const res = await fetch('/categories');
        const data = await res.json();
        allCategories = data.data || [];
        renderCategories();
    } catch {
        document.getElementById('categoryTags').innerHTML = '<span style="color:red;">Kategoriyalar yuklanmadi</span>';
    }
}

function renderCategories() {
    const categoryTags = document.getElementById('categoryTags');
    if (!categoryTags) return;
    categoryTags.innerHTML = '';
    // "Barchasi" tugmasi
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-tag' + (selectedCategory === null ? ' active' : '');
    allBtn.textContent = 'Barchasi';
    allBtn.onclick = () => {
        selectedCategory = null;
        renderCategories();
        renderProducts();
    };
    categoryTags.appendChild(allBtn);
    allCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-tag' + (selectedCategory === cat.name ? ' active' : '');
        btn.textContent = cat.name;
        btn.onclick = () => {
            selectedCategory = cat.name;
            renderCategories();
            renderProducts();
        };
        categoryTags.appendChild(btn);
    });
}

// Mahsulotlarni yuklash
async function loadProducts() {
    try {
        const res = await fetch('/products');
        const data = await res.json();
        allProducts = data.data || [];
        renderProducts();
        renderBrands();
    } catch {
        document.getElementById('productsGrid').innerHTML = '<div class="product-card"><p>Xatolik: Mahsulotlar yuklanmadi</p></div>';
    }
}

// Brendlarni filterga chiqarish
function renderBrands() {
    const brandSelect = document.getElementById('brandSelect');
    if (!brandSelect) return;
    const brands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))];
    brandSelect.innerHTML = '<option value="">Barcha brendlar</option>';
    brands.forEach(brand => {
        const opt = document.createElement('option');
        opt.value = brand;
        opt.textContent = brand;
        brandSelect.appendChild(opt);
    });
}

// Mahsulotlarni chiqarish
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    let filtered = [...allProducts];

    // Kategoriya bo'yicha filter
    if (selectedCategory) {
        const catObj = allCategories.find(cat => cat.name === selectedCategory);
        if (catObj) filtered = filtered.filter(product => product.categoryId === catObj._id || product.category === catObj._id);
    }

    // Brend bo'yicha filter
    const brandSelect = document.getElementById('brandSelect');
    if (brandSelect && brandSelect.value) {
        filtered = filtered.filter(product => product.brand === brandSelect.value);
    }

    // Narx bo'yicha filter
    const priceRange = document.getElementById('priceRange');
    if (priceRange && priceRange.value) {
        filtered = filtered.filter(product => Number(product.price) <= Number(priceRange.value));
    }

    // Omborda bor mahsulotlar
    const inStockOnly = document.getElementById('inStockOnly');
    if (inStockOnly && inStockOnly.checked) {
        filtered = filtered.filter(product => product.stock > 0 || product.inStock === true);
    }

    // Qidiruv bo'yicha filter
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
        const search = searchInput.value.trim().toLowerCase();
        filtered = filtered.filter(product =>
            (product.name && product.name.toLowerCase().includes(search)) ||
            (product.description && product.description.toLowerCase().includes(search))
        );
    }

    grid.innerHTML = '';
    if (filtered.length > 0) {
        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.cursor = "pointer";
            card.onclick = (e) => {
                if (e.target.classList.contains('add-to-cart-btn')) return;
                window.location.href = `../additional/product-details.html?id=${product._id}`;
            };
            const imageUrl =
                product.images && product.images.length > 0
                    ? `/uploads/products-images/${product._id}/${product.images[0]}`
                    : '/images/default.jpg';
            card.innerHTML = `
                <img src="${imageUrl}" alt="${product.name || 'Mahsulot'}">
                <div class="product-info">
                  <div class="product-title">${product.name || 'Mahsulot'}</div>
                  <div class="product-price">$${product.price?.toFixed(2) || '0.00'}</div>
                  <div class="product-desc">${product.description?.slice(0, 60) || ''}</div>
                  <button class="add-to-cart-btn">Savatga qo'shish</button>
                </div>
            `;
            card.querySelector('.add-to-cart-btn').onclick = (e) => {
                e.stopPropagation();
                addToCart(product);
            };
            grid.appendChild(card);
        });
    } else {
        grid.innerHTML = '<div class="product-card"><p>Mahsulot topilmadi</p></div>';
    }
}

// Savatga qo'shish
function addToCart(product) {
    const existing = cart.find(p => p._id === product._id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert("Mahsulot savatga qo'shildi!");
}

// Savatdagi mahsulotlar sonini yangilash
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.reduce((a, p) => a + (p.quantity || 1), 0);
}

// Narx slider qiymatini ko‘rsatish funksiyasi
function updatePriceValue() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceValue.textContent = priceRange.value;
    }
}

// Eventlar va boshlang‘ich yuklash
document.addEventListener('DOMContentLoaded', async function () {
    await getUserInfo();
    await loadCategories();
    await loadProducts();
    updateCartCount();

    // Brand, price, stock filterlar va search
    document.getElementById('brandSelect')?.addEventListener('change', renderProducts);

    // Slider o'zgarganda qiymatni chiqarish va filtrlash
    document.getElementById('priceRange')?.addEventListener('input', function() {
        updatePriceValue();
        renderProducts();
    });

    document.getElementById('inStockOnly')?.addEventListener('change', renderProducts);
    document.getElementById('searchForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        renderProducts();
    });

    // Slider qiymatini dastlab ko‘rsatish
    updatePriceValue();
});