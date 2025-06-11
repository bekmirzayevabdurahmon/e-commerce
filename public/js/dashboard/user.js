async function fetchApi(url, opts={}) {
  const res = await fetch(url, { credentials:"include", ...opts });
  if (!res.ok) throw new Error("API error");
  return res.json();
}
function logout() {
  fetch('/auth/logout', { method: 'POST', credentials: 'include' }).finally(()=>location.href='/');
}
let userId = null;
async function getUserId() {
  const user = await fetchApi('http://localhost:3000/auth/me');
  userId = user._id;
}
async function loadCart() {
  const { data } = await fetchApi(`http://localhost:3000/cart?user=${userId}`);
  let total = 0;
  document.getElementById('cart-table').innerHTML = data.map(item => {
    total += (item.product?.price||0) * (item.quantity||1);
    return `<tr>
      <td><img src="${item.product?.images?.[0] ? `/uploads/products-images/${item.product._id}/${item.product.images[0]}` : '/images/default.jpg'}" style="width:40px;height:40px;object-fit:cover;border-radius:7px"></td>
      <td>${item.product?.name||'-'}</td>
      <td>$${item.product?.price?.toFixed(2)||'-'}</td>
      <td>${item.quantity||1}</td>
      <td>
        <button class="btn-user" onclick="deleteCartItem('${item._id}')">O'chirish</button>
      </td>
    </tr>`;
  }).join('');
  document.getElementById('cart-total').textContent = total.toFixed(2);
}
window.deleteCartItem = async (cid) => {
  await fetchApi(`http://localhost:3000/cart/${cid}`, { method:"DELETE" });
  loadCart();
};
document.getElementById('checkout-btn').onclick = async function() {
  await fetchApi(`http://localhost:3000/orders`, { method:"POST" });
  alert("Buyurtma berildi!");
  loadCart();
  loadOrders();
};
async function loadOrders() {
  const { data } = await fetchApi(`http://localhost:3000/orders?user=${userId}`);
  document.getElementById('user-orders-table').innerHTML = data.map(o => `
    <tr>
      <td>${o._id||'-'}</td>
      <td>${o.products?.map(p=>p.name).join(", ")||'-'}</td>
      <td>$${o.totalPrice?.toFixed(2)||'-'}</td>
      <td>${o.status||'-'}</td>
    </tr>
  `).join('');
}
window.onload = async () => {
  await getUserId();
  loadCart();
  loadOrders();
};