// Tab navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById('tab-' + this.dataset.tab).classList.add('active');
    if(this.dataset.tab==="stats") loadStats();
    if(this.dataset.tab==="users") loadUsers();
    if(this.dataset.tab==="categories") loadCategories();
    if(this.dataset.tab==="products") loadProducts();
  }
});
function logout() {
  fetch('/auth/logout', { method: 'POST', credentials: 'include' }).finally(()=>location.href='/');
}
async function fetchApi(url, opts={}) {
  const res = await fetch(url, { credentials: "include", ...opts });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// --- STATISTICS ---
async function loadStats() {
  try {
    const [p, u, c, o] = await Promise.all([
      fetchApi('http://localhost:3000/products'),
      fetchApi('http://localhost:3000/users'),
      fetchApi('http://localhost:3000/categories'),
      fetchApi('http://localhost:3000/orders')
    ]);
    document.getElementById('admin-total-products').textContent = p.data?.length ?? 0;
    document.getElementById('admin-total-users').textContent = u.data?.length ?? 0;
    document.getElementById('admin-total-categories').textContent = c.data?.length ?? 0;
    document.getElementById('admin-total-orders').textContent = o.data?.length ?? 0;
  } catch (err) {}
}

// --- USERS CRUD ---
async function loadUsers() {
  try {
    const { data } = await fetchApi('http://localhost:3000/users');
    document.getElementById('admin-users-table').innerHTML = data.map(u => `
      <tr>
        <td>${u._id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>
          <button class="btn-action" onclick="editUser('${u._id}')">Tahrirlash</button>
          <button class="btn-action" onclick="deleteUser('${u._id}')">O'chirish</button>
        </td>
      </tr>
    `).join('');
  } catch {}
}
window.editUser = async (id) => {
  const { data } = await fetchApi(`http://localhost:3000/users/${id}`);
  openUserModal(data);
};
window.deleteUser = async (id) => {
  if (!confirm("O'chirishni istaysizmi?")) return;
  await fetchApi(`http://localhost:3000/users/${id}`, { method: "DELETE" });
  loadUsers();
};
function openUserModal(data={}) {
  const modal = document.getElementById('user-modal');
  modal.innerHTML = `
    <h2>${data._id ? "Foydalanuvchini tahrirlash" : "Yangi foydalanuvchi qo'shish"}</h2>
    <form id="userForm">
      <input type="hidden" name="_id" value="${data._id||''}">
      <label>Ism:<input name="name" value="${data.name||''}" required></label>
      <label>Email:<input name="email" type="email" value="${data.email||''}" required></label>
      <label>Rol:
        <select name="role" required>
          <option value="user" ${data.role==="user"?"selected":""}>Oddiy</option>
          <option value="seller" ${data.role==="seller"?"selected":""}>Sotuvchi</option>
          <option value="admin" ${data.role==="admin"?"selected":""}>Admin</option>
        </select>
      </label>
      <label>Parol (faqat yaratishda yoki yangilashda):<input name="password" type="password"></label>
      <div class="modal-actions">
        <button type="submit">${data._id ? "Yangilash" : "Qo'shish"}</button>
        <button type="button" onclick="closeModal()">Bekor qilish</button>
      </div>
    </form>
  `;
  openModal('user-modal');
  document.getElementById('userForm').onsubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd.entries());
    if (!body._id) delete body._id;
    if (!body.password) delete body.password;
    try {
      await fetchApi(`http://localhost:3000/users${body._id?`/${body._id}`:""}`, {
        method: body._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      closeModal();
      loadUsers();
    } catch (err) { alert("Xatolik: "+err.message); }
  }
}

// --- CATEGORY CRUD ---
async function loadCategories() {
  try {
    const { data } = await fetchApi('http://localhost:3000/categories');
    document.getElementById('admin-categories-table').innerHTML = data.map(c => `
      <tr>
        <td>${c._id}</td>
        <td>${c.name}</td>
        <td>${c.products?.length||0}</td>
        <td>
          <button class="btn-action" onclick="editCategory('${c._id}')">Tahrirlash</button>
          <button class="btn-action" onclick="deleteCategory('${c._id}')">O'chirish</button>
        </td>
      </tr>
    `).join('');
  } catch {}
}
window.editCategory = async (id) => {
  const { data } = await fetchApi(`http://localhost:3000/categories/${id}`);
  openCategoryModal(data);
};
window.deleteCategory = async (id) => {
  if (!confirm("O'chirishni istaysizmi?")) return;
  await fetchApi(`http://localhost:3000/categories/${id}`, { method: "DELETE" });
  loadCategories();
};
function openCategoryModal(data={}) {
  const modal = document.getElementById('category-modal');
  modal.innerHTML = `
    <h2>${data._id ? "Kategoriyani tahrirlash" : "Yangi kategoriya qo'shish"}</h2>
    <form id="categoryForm">
      <input type="hidden" name="_id" value="${data._id||''}">
      <label>Nomi:<input name="name" value="${data.name||''}" required></label>
      <div class="modal-actions">
        <button type="submit">${data._id ? "Yangilash" : "Qo'shish"}</button>
        <button type="button" onclick="closeModal()">Bekor qilish</button>
      </div>
    </form>
  `;
  openModal('category-modal');
  document.getElementById('categoryForm').onsubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd.entries());
    if (!body._id) delete body._id;
    try {
      await fetchApi(`http://localhost:3000/categories${body._id?`/${body._id}`:""}`, {
        method: body._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      closeModal();
      loadCategories();
    } catch (err) { alert("Xatolik: "+err.message); }
  }
}

// --- PRODUCT CRUD ---
async function loadProducts() {
  try {
    const { data } = await fetchApi('http://localhost:3000/products');
    document.getElementById('admin-products-table').innerHTML = data.map(p => `
      <tr>
        <td>
          ${p.images && p.images.length
            ? `<img class="product-img" src="/uploads/products-images/${p._id}/${p.images[0]}" alt="">`
            : `<img class="product-img" src="/images/default.jpg" alt="-">`}
        </td>
        <td>${p.name}</td>
        <td>${p.category?.name||'-'}</td>
        <td>$${p.price?.toFixed(2)||'-'}</td>
        <td>${p.brand||'-'}</td>
        <td>
          <button class="btn-action" onclick="editProduct('${p._id}')">Tahrirlash</button>
          <button class="btn-action" onclick="deleteProduct('${p._id}')">O'chirish</button>
        </td>
      </tr>
    `).join('');
  } catch {}
}
window.editProduct = async (id) => {
  const { data } = await fetchApi(`http://localhost:3000/products/${id}`);
  openProductModal(data);
};
window.deleteProduct = async (id) => {
  if (!confirm("O'chirishni istaysizmi?")) return;
  await fetchApi(`http://localhost:3000/products/${id}`, { method: "DELETE" });
  loadProducts();
};

window.validateImagesCount = function(input) {
  const count = input.files.length;
  const warn = document.getElementById('image-count-warning');
  if(count < 2 || count > 10) {
    warn.textContent = "Iltimos, 2 tadan 10 tagacha rasm tanlang!";
    input.setCustomValidity("2 tadan 10 tagacha yuklang!");
  } else {
    warn.textContent = "";
    input.setCustomValidity("");
  }
}

function openProductModal(data={}) {
  fetchApi('http://localhost:3000/categories').then(res => {
    const cats = res.data||[];
    const modal = document.getElementById('product-modal');
    modal.innerHTML = `
      <h2 style="margin-bottom:1.3rem;">${data._id ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}</h2>
      <form id="productForm" enctype="multipart/form-data">
        <div class="form-grid">
          <div>
            <label>Nomi
              <input name="name" value="${data.name||''}" required>
            </label>
            <label>Tavsifi
              <input name="description" value="${data.description||''}" required>
            </label>
            <label>Narxi
              <input type="number" step="0.01" name="price" value="${data.price||''}" required>
            </label>
            <label>Brend
              <input name="brand" value="${data.brand||''}" required>
            </label>
            <label>Kategoriya
              <select name="categoryId" required>
                <option value="">Tanlang</option>
                ${cats.map(cat=>`<option value="${cat._id}"${data.categoryId===cat._id||data.category===cat._id?'selected':''}>${cat.name}</option>`).join('')}
              </select>
            </label>
            <label>Rangi
              <input name="color" value="${data.color||''}" required>
            </label>
            <label>RAM
              <input name="ram" value="${data.ram||''}" required>
            </label>
            <label>Xotira
              <input name="storage" value="${data.storage||''}" required>
            </label>
          </div>
          <div>
            <label>Protsessor
              <input name="processor" value="${data.processor||''}" required>
            </label>
            <label>Batareya
              <input name="battery" value="${data.battery||''}" required>
            </label>
            <label>Kamera
              <input name="camera" value="${data.camera||''}" required>
            </label>
            <label>Selfie kamera
              <input name="selfieCamera" value="${data.selfieCamera||''}" required>
            </label>
            <label>Zaxira
              <input type="number" name="stock" value="${data.stock||''}" required>
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
      if(imagesInput && (imagesInput.files.length < 2 || imagesInput.files.length > 10)) {
        document.getElementById('image-count-warning').textContent = "Iltimos, 2 tadan 10 tagacha rasm tanlang!";
        e.preventDefault();
        return false;
      }
      e.preventDefault();
      const form = e.target;
      const fd = new FormData(form);
      try {
        await fetch(`http://localhost:3000/products${fd.get('_id')?`/${fd.get('_id')}`:""}`, {
          method: fd.get('_id') ? "PUT" : "POST",
          credentials: 'include',
          body: fd
        });
        closeModal();
        loadProducts();
      } catch (err) {
        alert("Xatolik: " + err.message);
      }
    }
  });
}

// --- MODAL helpers ---
function openModal(id) {
  document.getElementById('modal-bg').classList.add('active');
  document.getElementById(id).classList.add('active');
}
function closeModal() {
  document.getElementById('modal-bg').classList.remove('active');
  document.getElementById('user-modal').classList.remove('active');
  document.getElementById('category-modal').classList.remove('active');
  document.getElementById('product-modal').classList.remove('active');
}

// Initial loading
window.onload = () => {
  loadStats();
  loadUsers();
  loadCategories();
  loadProducts();
};