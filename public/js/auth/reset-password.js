// URLdan tokenni avtomatik olish
function getTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('token');
}

document.getElementById('resetPasswordForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const newPassword = e.target.newPassword.value;
  const token = getTokenFromUrl();
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = '';
  messageDiv.style.color = '#333';

  if (!token) {
    messageDiv.textContent = "Token topilmadi yoki link noto'g'ri.";
    messageDiv.style.color = '#ef4444';
    return;
  }

  try {
    const response = await fetch('/auth/reset-password', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ token, newPassword })
    });
    const result = await response.json();
    if (response.ok) {
      messageDiv.textContent = 'Parolingiz muvaffaqiyatli yangilandi!';
      messageDiv.style.color = '#10b981';
      e.target.reset();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1800);
    } else {
      messageDiv.textContent = result.message || 'Xatolik yuz berdi';
      messageDiv.style.color = '#ef4444';
    }
  } catch (err) {
    messageDiv.textContent = 'Serverda xatolik. Qayta urinib ko‘ring!';
    messageDiv.style.color = '#ef4444';
  }
});