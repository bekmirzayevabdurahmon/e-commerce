// Savat localStorage'dan
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Username va logout
document.addEventListener('DOMContentLoaded', function() {
    // Dark/Light
    const themeToggle = document.getElementById('themeToggle');
    function setTheme(dark) {
        document.body.classList.toggle('dark-mode', dark);
        localStorage.setItem('darkMode', dark ? 'true' : 'false');
    }
    themeToggle?.addEventListener('click', () => {
        setTheme(!document.body.classList.contains('dark-mode'));
    });
    if (localStorage.getItem('darkMode') === 'true') setTheme(true);

    // Username chiqarish
    const usernameEl = document.getElementById('username');
    async function getUserInfo() {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const res = await fetch('/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) return;
            const user = await res.json();
            usernameEl.textContent = user.data?.name || user.data?.email || '';
        } catch {}
    }
    getUserInfo();
    // Logout
    const logoutBtn = document.getElementById('logoutButton');
    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('token');
        location.href = '/pages/auth/login.html';
    });

    updateCartCount();
    renderCart();
});

// Savatdagi mahsulotlar chiqarish
function renderCart() {
    const cartBody = document.getElementById('cartBody');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartTable = document.getElementById('cartTable');
    const cartSummary = document.getElementById('cartSummary');
    if (cart.length === 0) {
        cartEmpty.style.display = "";
        cartTable.style.display = "none";
        cartSummary.style.display = "none";
        return;
    }
    cartEmpty.style.display = "none";
    cartTable.style.display = "";
    cartSummary.style.display = "";

    cartBody.innerHTML = "";
    let total = 0;
    cart.forEach((item, idx) => {
        const itemSum = (item.price || 0) * (item.quantity || 1);
        total += itemSum;
        const imageUrl = item.images && item.images.length > 0
            ? `/uploads/products-images/${item._id}/${item.images[0]}`
            : '/images/default.jpg';
        cartBody.innerHTML += `
            <tr>
                <td>
                    <div class="cart-product-info">
                        <img src="${imageUrl}" alt="${item.name || ''}">
                        <div>
                            <div class="cart-product-name">${item.name || ''}</div>
                            <div class="cart-product-desc">${item.description?.slice(0, 40) || ''}</div>
                        </div>
                    </div>
                </td>
                <td>$${item.price?.toFixed(2) || '0.00'}</td>
                <td>
                    <div class="cart-qty">
                        <button onclick="changeQty(${idx}, -1)">-</button>
                        <span>${item.quantity || 1}</span>
                        <button onclick="changeQty(${idx}, 1)">+</button>
                    </div>
                </td>
                <td>$${itemSum.toFixed(2)}</td>
                <td>
                    <button class="cart-remove-btn" onclick="removeFromCart(${idx})">&times;</button>
                </td>
            </tr>
        `;
    });
    document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
}
function changeQty(idx, delta) {
    if (!cart[idx]) return;
    cart[idx].quantity = Math.max(1, (cart[idx].quantity || 1) + delta);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}
function removeFromCart(idx) {
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}
function updateCartCount() {
    document.getElementById('cartCount').textContent =
        cart.reduce((a, p) => a + (p.quantity || 1), 0);
}

// Buyurtma tugmasi (demo)
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) return;
        alert('Buyurtma demo rejimida! (Amalda buyurtma serverga yuborilmaydi)');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    });
});