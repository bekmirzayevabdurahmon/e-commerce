let userId = null;
let allProducts = [];
let allCategories = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Foydalanuvchini aniqlash
async function getUserId() {
    try {
        const res = await fetch('/auth/me');
        const user = await res.json();
        userId = user.data?._id || user._id;
        document.getElementById('username').textContent = user.data?.name || user.data?.email || '';
        return userId;
    } catch {
        return null;
    }
}

// Kategoriyalar va filterlar
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
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-tag active';
    allBtn.textContent = 'Barchasi';
    allBtn.onclick = () => {
        document.querySelectorAll('.filter-tag').forEach(btn => btn.classList.remove('active'));
        allBtn.classList.add('active');
        renderProducts();
    };
    categoryTags.appendChild(allBtn);
    allCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-tag';
        btn.textContent = cat.name;
        btn.onclick = () => {
            document.querySelectorAll('.filter-tag').forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            renderProducts({ categoryId: cat._id });
        };
        categoryTags.appendChild(btn);
    });
}

// Mahsulotlarni yuklash va ko‘rsatish
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
function getFilters() {
    const categoryActive = document.querySelector('.filter-tag.active');
    const brand = document.getElementById('brandSelect')?.value || '';
    const maxPrice = Number(document.getElementById('priceRange')?.value || 1e9);
    const inStock = document.getElementById('inStockOnly')?.checked;
    let categoryId = null;
    if (categoryActive && categoryActive.textContent !== "Barchasi") {
        const cat = allCategories.find(c => c.name === categoryActive.textContent);
        if (cat) categoryId = cat._id;
    }
    return { categoryId, brand, maxPrice, inStock };
}
function renderProducts(extra = {}) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    let filtered = [...allProducts];
    const q = document.getElementById('searchInput')?.value?.trim().toLowerCase() || '';
    const { categoryId, brand, maxPrice, inStock } = { ...getFilters(), ...extra };
    if (categoryId) filtered = filtered.filter(p => p.categoryId === categoryId || p.category === categoryId);
    if (brand) filtered = filtered.filter(p => (p.brand || '').toLowerCase() === brand.toLowerCase());
    if (maxPrice) filtered = filtered.filter(p => Number(p.price) <= maxPrice);
    if (inStock) filtered = filtered.filter(p => p.inStock !== false && p.inStock !== 0);
    if (q) {
        filtered = filtered.filter(
            p =>
                (p.name && p.name.toLowerCase().includes(q)) ||
                (p.description && p.description.toLowerCase().includes(q)) ||
                (p.brand && p.brand.toLowerCase().includes(q))
        );
    }
    grid.innerHTML = '';
    if (filtered.length > 0) {
        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const imageUrl = product.images && product.images.length > 0
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
            card.querySelector('.add-to-cart-btn').onclick = () => addToCart(product);
            grid.appendChild(card);
        });
    } else {
        grid.innerHTML = '<div class="product-card"><p>Mahsulot topilmadi</p></div>';
    }
}

// Savat funksiyalari
function addToCart(product) {
    const existing = cart.find(p => p._id === product._id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert("Mahsulot savatga qo'shildi!");
}
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.reduce((a, p) => a + (p.quantity || 1), 0);
}
function loadCart() {
    const cartTable = document.getElementById('cartTable');
    if (!cartTable) return;
    let total = 0;
    cartTable.innerHTML = cart.map(item => {
        const sum = (item.price || 0) * (item.quantity || 1);
        total += sum;
        return `<tr>
          <td><img src="${item.images?.[0] ? `/uploads/products-images/${item._id}/${item.images[0]}` : '/images/default.jpg'}" style="width:40px;height:40px;object-fit:cover;border-radius:7px"></td>
          <td>${item.name || '-'}</td>
          <td>$${item.price?.toFixed(2) || '-'}</td>
          <td>${item.quantity || 1}</td>
          <td>
            <button class="btn-user" onclick="deleteCartItem('${item._id}')">O'chirish</button>
          </td>
        </tr>`;
    }).join('');
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}
window.deleteCartItem = function(id) {
    cart = cart.filter(item => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
};

// Buyurtma qilish
async function makeOrder() {
    if (!userId) {
        alert("Buyurtma berish uchun avval tizimga kiring!");
        return;
    }
    try {
        const response = await fetch('/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: userId, items: cart })
        });
        if (response.ok) {
            alert("Buyurtma berildi!");
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            loadCart();
            loadOrders();
        } else {
            alert("Xatolik: Buyurtma berilmadi");
        }
    } catch {
        alert("Serverda xatolik");
    }
}

// Buyurtmalar ro‘yxati
async function loadOrders() {
    if (!userId) return;
    try {
        const res = await fetch(`/orders?user=${userId}`);
        const data = await res.json();
        const orders = data.data || [];
        const ordersTable = document.getElementById('ordersTable');
        if (!ordersTable) return;
        ordersTable.innerHTML = orders.map(o => `
          <tr>
            <td>${o._id || '-'}</td>
            <td>${o.products?.map(p => p.name).join(", ") || '-'}</td>
            <td>$${o.totalPrice?.toFixed(2) || '-'}</td>
            <td>${o.status || '-'}</td>
          </tr>
        `).join('');
    } catch {}
}

// Eventlar
document.addEventListener('DOMContentLoaded', async function () {
    await getUserId();
    await loadCategories();
    await loadProducts();
    updateCartCount();
    document.getElementById('brandSelect')?.addEventListener('change', renderProducts);
    document.getElementById('priceRange')?.addEventListener('input', renderProducts);
    document.getElementById('inStockOnly')?.addEventListener('change', renderProducts);
    document.getElementById('searchForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        renderProducts();
    });
    loadCart();
    loadOrders();
    document.getElementById('orderBtn')?.addEventListener('click', makeOrder);
});