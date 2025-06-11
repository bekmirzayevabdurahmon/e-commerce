function logout() {
  fetch('/auth/logout', { method: 'POST', credentials: 'include' }).finally(() => location.href = '/');
}

async function fetchApi(url, opts = {}) {
  const res = await fetch(url, { credentials: "include", ...opts });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

let sellerId = null;

// 1. Foydalanuvchining (sellerning) ID sini olish
async function getSellerId() {
  const user = await fetchApi('http://localhost:3000/users/me');
  sellerId = user.data._id; // yoki user.data.id - schema ga qarab
}

// 2. Mahsulotlar ro‘yxatini yuklash
async function loadMyProducts() {
  if (!sellerId) return;
  const { data } = await fetchApi(`http://localhost:3000/products?sellerId=${sellerId}`);
  document.getElementById('seller-products-table').innerHTML = data.map(p => `
    <tr>
      <td>
        ${p.images && p.images.length
            ? `<img class="product-img" src="/uploads/products-images/${p._id}/${p.images[0]}" alt="">`
            : `<img class="product-img" src="/images/default.jpg" alt="-">`}
      </td>
      <td>${p.name}</td>
      <td>${p.category?.name || '-'}</td>
      <td>$${p.price?.toFixed(2) || '-'}</td>
      <td>${p.brand || '-'}</td>
      <td>
        <button class="btn-action" onclick="editProduct('${p._id}')">Tahrirlash</button>
        <button class="btn-action" onclick="deleteProduct('${p._id}')">O'chirish</button>
      </td>
    </tr>
  `).join('');
}
window.editProduct = async (id) => {
  const { data } = await fetchApi(`http://localhost:3000/products/${id}`);
  openProductModal(data);
};
window.deleteProduct = async (id) => {
  if (!confirm("O'chirishni istaysizmi?")) return;
  await fetchApi(`http://localhost:3000/products/${id}`, { method: "DELETE" });
  loadMyProducts();
};

window.validateImagesCount = function (input) {
  const count = input.files.length;
  const warn = document.getElementById('image-count-warning');
  if (count < 2 || count > 10) {
    warn.textContent = "Iltimos, 2 tadan 10 tagacha rasm tanlang!";
    input.setCustomValidity("2 tadan 10 tagacha yuklang!");
  } else {
    warn.textContent = "";
    input.setCustomValidity("");
  }
}

// 3. Mahsulot yaratish va tahrirlash modalini ochish
function openProductModal(data = {}) {
  fetchApi('http://localhost:3000/categories').then(res => {
    const cats = res.data || [];
    const modal = document.getElementById('product-modal');
    modal.innerHTML = `
      <h2 style="margin-bottom:1.3rem;">${data._id ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}</h2>
      <form id="productForm" enctype="multipart/form-data">
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
                ${cats.map(cat => `<option value="${cat._id}"${data.categoryId === cat._id || data.category === cat._id ? 'selected' : ''}>${cat.name}</option>`).join('')}
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
            <span id="image-count-warning"></span>
          </div>
        </div>
        <div class="modal-actions">
          <button type="submit">${data._id ? "Yangilash" : "Qo'shish"}</button>
          <button type="button" onclick="closeModal()">Bekor qilish</button>
        </div>
      </form>
    `;
    openModal('product-modal');
    document.getElementById('productForm').onsubmit = async e => {
      const imagesInput = e.target.elements['images'];
      if (imagesInput && (imagesInput.files.length < 2 || imagesInput.files.length > 10)) {
        document.getElementById('image-count-warning').textContent = "Iltimos, 2 tadan 10 tagacha rasm tanlang!";
        e.preventDefault();
        return false;
      }
      e.preventDefault();
      const form = e.target;
      const fd = new FormData(form);
      fd.append('sellerId', sellerId); // sellerId avtomatik!
      try {
        await fetch(`http://localhost:3000/products${fd.get('_id') ? `/${fd.get('_id')}` : ""}`, {
          method: fd.get('_id') ? "PUT" : "POST",
          credentials: 'include',
          body: fd
        });
        closeModal();
        loadMyProducts();
      } catch (err) {
        alert("Xatolik: " + err.message);
      }
    }
  });
}

function openModal(id) {
  document.getElementById('modal-bg').classList.add('active');
  document.getElementById(id).classList.add('active');
}
function closeModal() {
  document.getElementById('modal-bg').classList.remove('active');
  document.getElementById('product-modal').classList.remove('active');
}

window.onload = async () => {
  await getSellerId();
  await loadMyProducts();
};