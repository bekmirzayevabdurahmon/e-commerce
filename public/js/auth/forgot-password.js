document.getElementById('forgotPasswordForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = e.target.email.value;
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = '';
  messageDiv.style.color = '#333';

  try {
    const response = await fetch('/auth/forget-password', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email })
    });
    const result = await response.json();
    if (response.ok) {
      messageDiv.textContent = 'Emailga parolni tiklash uchun link yuborildi!';
      messageDiv.style.color = '#10b981';
      e.target.reset();
    } else {
      messageDiv.textContent = result.message || 'Xatolik yuz berdi';
      messageDiv.style.color = '#ef4444';
    }
  } catch (err) {
    messageDiv.textContent = 'Serverda xatolik. Qayta urinib ko‘ring!';
    messageDiv.style.color = '#ef4444';
  }
});