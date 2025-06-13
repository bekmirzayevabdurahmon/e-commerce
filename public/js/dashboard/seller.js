let sellerId = null;

// API so‘rovlarini amalga oshirish uchun yordamchi funksiya
async function fetchApi(url, opts = {}) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token not found. Please log in.');
  }
  const headers = {
    ...opts.headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await fetch(url, { credentials: 'include', headers, ...opts });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } catch (err) {
    console.error(`Error fetching ${url}:`, err.message);
    throw err;
  }
}

// Foydalanuvchining (sellerning) ID sini olish
async function getSellerId() {
  try {
    const user = await fetchApi('http://localhost:3000/users/me');
    console.log('Full user response:', user);
    console.log(user.data.data._id, user.data.data.name);
    sellerId = user.data.data._id;
    console.log('Assigned sellerId:', sellerId);
    if (!sellerId) throw new Error('Seller ID not found in user data');
    const role = user.data.data?.role;
    if (role !== 'seller') {
      throw new Error('Bu sahifa faqat sellerlar uchun mo\'ljallangan. Iltimos, mos roldagi hisobingiz bilan kiring.');
    }
  } catch (err) {
    console.error('Error fetching seller ID:', err.message);
    if (err.message.includes('Authentication token not found') || err.message.includes('Invalid token')) {
      alert('Sizning sessiyangiz muddati tugagan. Iltimos, qayta kiring!');
      localStorage.removeItem('token');
      setTimeout(() => location.href = '../auth/login.html', 2000);
    } else {
      alert('Foydalanuvchi ma\'lumotlarini olishda xatolik: ' + err.message);
    }
    return false;
  }
  return true;
}

// Mahsulotlar ro‘yxatini yuklash
async function loadMyProducts() {
  if (!sellerId) {
    alert('Foydalanuvchi ma\'lumotlari topilmadi. Iltimos, qayta kiring.');
    return;
  }
  try {
    document.getElementById('seller-products-table').innerHTML = '<tr><td colspan="6">Yuklanmoqda...</td></tr>';
    const { data } = await fetchApi(`http://localhost:3000/products?sellerId=${sellerId}`);
    if (!Array.isArray(data)) throw new Error('Invalid products data');
    document.getElementById('seller-products-table').innerHTML = data.map(p => `
      <tr>
        <td>
          ${p.images && p.images.length
              ? `<img class="product-img" src="/Uploads/products-images/${p._id}/${p.images[0]}" alt="${p.name || ''}">`
              : `<img class="product-img" src="/images/default.jpg" alt="No image">`}
        </td>
        <td>${p.name || '-'}</td>
        <td>${p.category?.name || '-'}</td>
        <td>$${p.price?.toFixed(2) || '-'}</td>
        <td>${p.brand || '-'}</td>
        <td>
          <button class="btn-action" onclick="editProduct('${p._id}')">Tahrirlash</button>
          <button class="btn-action" onclick="deleteProduct('${p._id}')">O'chirish</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading products:', err.message);
    document.getElementById('seller-products-table').innerHTML = '<tr><td colspan="6">Ma\'lumotlarni yuklashda xatolik yuz berdi.</td></tr>';
    alert('Mahsulotlarni yuklashda xatolik: ' + err.message);
  }
}

// Mahsulotni tahrirlash
window.editProduct = async (id) => {
  try {
    const { data } = await fetchApi(`http://localhost:3000/products/${id}`);
    openProductModal(data);
  } catch (err) {
    console.error('Error fetching product:', err.message);
    if (err.message.includes('Authentication token not found') || err.message.includes('Invalid token')) {
      alert('Sizning sessiyangiz muddati tugagan. Iltimos, qayta kiring!');
      localStorage.removeItem('token');
      setTimeout(() => location.href = '../auth/login.html', 2000);
    } else {
      alert('Mahsulot ma\'lumotlarini olishda xatolik: ' + err.message);
    }
  }
};

// Mahsulotni o‘chirish
window.deleteProduct = async (id) => {
  if (!confirm('Mahsulotni o‘chirishni tasdiqlaysizmi?')) return;
  try {
    await fetchApi(`http://localhost:3000/products/${id}`, { method: 'DELETE' });
    alert('Mahsulot muvaffaqiyatli o‘chirildi!');
    await loadMyProducts();
  } catch (err) {
    console.error('Error deleting product:', err.message);
    if (err.message.includes('Authentication token not found') || err.message.includes('Invalid token')) {
      alert('Sizning sessiyangiz muddati tugagan. Iltimos, qayta kiring!');
      localStorage.removeItem('token');
      setTimeout(() => location.href = '../auth/login.html', 2000);
    } else {
      alert('Mahsulotni o‘chirishda xatolik: ' + err.message);
    }
  }
};

// Rasmlar sonini tekshirish
window.validateImagesCount = function (input) {
  const count = input.files.length;
  const warn = document.getElementById('image-count-warning');
  if (count < 2 || count > 10) {
    warn.textContent = 'Iltimos, 2 tadan 10 tagacha rasm tanlang!';
    input.setCustomValidity('2 tadan 10 tagacha yuklang!');
  } else {
    warn.textContent = '';
    input.setCustomValidity('');
  }
};

// Mahsulot yaratish/tahrirlash modalini ochish
function openProductModal(data = {}) {
  try {
    fetchApi('http://localhost:3000/categories')
      .then(res => {
        const cats = res.data || [];
        const modal = document.getElementById('product-modal');
        modal.innerHTML = `
          <h2 style="margin-bottom:1.3rem;">${data._id ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}</h2>
          <form id="productForm" enctype="multipart/form-data">
            ${data._id ? `<input type="hidden" name="_id" value="${data._id}">` : ''}
            <div class="form-grid">
              <div>
                <label>Nomi
                  <input name="name" value="${data.name || ''}" required>
                </label>
                <label>Tavsifi
                  <input name="description" value="${data.description || ''}" required>
                </label>
                <label>Narxi
                  <input type="number" step="0.01" name="price" value="${data.price || ''}" required>
                </label>
                <label>Brend
                  <input name="brand" value="${data.brand || ''}" required>
                </label>
                <label>Kategoriya
                  <select name="categoryId" required>
                    <option value="">Tanlang</option>
                    ${cats.map(cat => `<option value="${cat._id}" ${data.categoryId === cat._id || data.category?._id === cat._id ? 'selected' : ''}>${cat.name}</option>`).join('')}
                  </select>
                </label>
                <label>Rangi
                  <input name="color" value="${data.color || ''}" required>
                </label>
                <label>RAM
                  <input name="ram" value="${data.ram || ''}" required>
                </label>
                <label>Xotira
                  <input name="storage" value="${data.storage || ''}" required>
                </label>
              </div>
              <div>
                <label>Protsessor
                  <input name="processor" value="${data.processor || ''}" required>
                </label>
                <label>Batareya
                  <input name="battery" value="${data.battery || ''}" required>
                </label>
                <label>Kamera
                  <input name="camera" value="${data.camera || ''}" required>
                </label>
                <label>Selfie kamera
                  <input name="selfieCamera" value="${data.selfieCamera || ''}" required>
                </label>
                <label>Zaxira
                  <input type="number" name="stock" value="${data.stock || ''}" required>
                </label>
                <label>Rasmlar (2–10 dona):
                  <input type="file" name="images" ${data._id ? '' : 'required'} multiple accept="image/*" onchange="validateImagesCount(this)">
                </label>
                <span id="image-count-warning" style="color: red;"></span>
              </div>
            </div>
            <div class="modal-actions">
              <button type="submit">${data._id ? 'Yangilash' : 'Qo\'shish'}</button>
              <button type="button" onclick="closeModal()">Bekor qilish</button>
            </div>
          </form>
        `;
        openModal('product-modal');
        document.getElementById('productForm').onsubmit = async e => {
          e.preventDefault();
          const form = e.target;
          const imagesInput = form.elements['images'];
          if (imagesInput && !data._id && (imagesInput.files.length < 2 || imagesInput.files.length > 10)) {
            document.getElementById('image-count-warning').textContent = 'Iltimos, 2 tadan 10 tagacha rasm tanlang!';
            return;
          }
          const fd = new FormData(form);
          fd.append('sellerId', sellerId);
          try {
            await fetchApi(`http://localhost:3000/products${data._id ? `/${data._id}` : ''}`, {
              method: data._id ? 'PUT' : 'POST',
              body: fd,
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
            });
            alert(`Mahsulot ${data._id ? 'yangilandi' : 'qo\'shildi'}!`);
            closeModal();
            await loadMyProducts();
          } catch (err) {
            console.error('Error saving product:', err.message);
            if (err.message.includes('Authentication token not found') || err.message.includes('Invalid token')) {
              alert('Sizning sessiyangiz muddati tugagan. Iltimos, qayta kiring!');
              localStorage.removeItem('token');
              setTimeout(() => location.href = '../auth/login.html', 2000);
            } else {
              alert('Mahsulotni saqlashda xatolik: ' + err.message);
            }
          }
        };
      })
      .catch(err => {
        console.error('Error fetching categories:', err.message);
        if (err.message.includes('Authentication token not found') || err.message.includes('Invalid token')) {
          alert('Sizning sessiyangiz muddati tugagan. Iltimos, qayta kiring!');
          localStorage.removeItem('token');
          setTimeout(() => location.href = '../auth/login.html', 2000);
        } else {
          alert('Kategoriyalarni olishda xatolik: ' + err.message);
        }
      });
  } catch (err) {
    console.error('Error opening product modal:', err.message);
    alert('Modalni ochishda xatolik: ' + err.message);
  }
}

// Modalni ochish va yopish
function openModal(id) {
  const modalBg = document.getElementById('modal-bg');
  const modal = document.getElementById(id);
  if (modalBg && modal) {
    modalBg.classList.add('active');
    modal.classList.add('active');
  }
}

function closeModal() {
  const modalBg = document.getElementById('modal-bg');
  const modal = document.getElementById('product-modal');
  if (modalBg && modal) {
    modalBg.classList.remove('active');
    modal.classList.remove('active');
  }
}

// Logout funksiyasi
function logout() {
  localStorage.removeItem('token'); 
  alert('Chiqishni xohlaysizmi');
  setTimeout(() => location.href = '../auth/login.html', 1000);
}

// Sahifa yuklanganda
window.onload = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Iltimos, tizimga kiring!');
    location.href = '../auth/login.html';
    return;
  }
  const success = await getSellerId();
  if (success) {
    await loadMyProducts();
  }
};