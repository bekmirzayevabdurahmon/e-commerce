document.getElementById('forgotPasswordForm').onsubmit = async function (e) {
  e.preventDefault();
  const email = document.getElementById('forgot-email').value;
  document.getElementById('forgot-status').textContent = 'Yuborilmoqda...';

  try {
    const res = await fetch('http://localhost:3000/auth/forget-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok) {
      document.getElementById('forgot-status').textContent = 
        'Emailga reset token yuborildi! (Testda token: ' + (data.token || '') + ')';
      // Real loyihada: reset sahifasiga yo'naltirish yoki foydalanuvchiga xabar
    } else {
      document.getElementById('forgot-status').textContent = data.message || 'Xatolik';
    }
  } catch (err) {
    document.getElementById('forgot-status').textContent = 'Server xatoligi!';
  }
};