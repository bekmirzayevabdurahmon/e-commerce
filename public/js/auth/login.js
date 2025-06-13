document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector('.login-button');
  const messageDiv = document.getElementById('message');

  // Animatsiya boshlanishi
  button.classList.add('loading');
  button.textContent = 'Logging in...';
  button.disabled = true;
  messageDiv.classList.remove('show');
  messageDiv.textContent = '';

  const formData = {
    email: form.email.value.trim(),
    password: form.password.value.trim()
  };

  try {
    // API so‘rov (backend endpoint)
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      // Tokenni saqlash (backenddan accessToken deb qaytadi)
      if (result.data?.accessToken) {
        localStorage.setItem('token', result.data.accessToken);
      } else {
        console.warn('Access token not found in response. Ensure backend returns accessToken.');
        throw new Error('Authentication token not received');
      }

      messageDiv.textContent = 'Login successful! Redirecting...';
      messageDiv.style.color = '#10b981';
      messageDiv.classList.add('show');

      form.classList.add('success-animation');

      const role = result.data.user?.role;
      let redirectUrl = '/home.html'; 

      if (role === 'seller') {
        redirectUrl = '../dashboards/seller.html';
      } else if (role === 'admin') {
        redirectUrl = '../dashboards/admin.html';
      } else if (role === 'user') {
        redirectUrl = '../dashboards/home.html';
      }

      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1500);
    } else {
      messageDiv.textContent = result.message || 'Login failed. Please try again.';
      messageDiv.style.color = '#ef4444';
      messageDiv.classList.add('show');
    }
  } catch (error) {
    console.error('Login error:', error.message);
    messageDiv.textContent = 'An error occurred. Please try again.';
    messageDiv.style.color = '#ef4444';
    messageDiv.classList.add('show');
  } finally {
    // Animatsiyani to‘xtatish
    button.classList.remove('loading');
    button.textContent = 'Login';
    button.disabled = false;
  }
});

// Muvaffaqiyat animatsiyasi uchun CSS
const style = document.createElement('style');
style.textContent = `
  .login-button.loading {
    opacity: 0.7;
    cursor: not-allowed;
  }
  .success-animation {
    animation: successShake 0.5s ease;
  }
  @keyframes successShake {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-5px) rotate(2deg); }
    75% { transform: translateY(-5px) rotate(-2deg); }
  }
  #message.show {
    display: block;
    transition: opacity 0.3s ease;
  }
  #message {
    display: none;
    margin-top: 10px;
  }
`;
document.head.appendChild(style);