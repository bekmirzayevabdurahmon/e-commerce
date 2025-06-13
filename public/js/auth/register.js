const { from } = require("rxjs");

document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const button = form.querySelector('.register-button');
    const messageDiv = document.getElementById('message');

    // Animatsiya boshlanishi
    button.classList.add('loading');
    button.textContent = 'Registering...';
    button.disabled = true;
    messageDiv.classList.remove('show');
    messageDiv.textContent = '';

    const formData = {
        name: form.name.value,
        email: form.email.value,
        phoneNumber: form.phoneNumber.value,
        password: form.password.value,
        companyName: form.companyName.value,
        role: form.role.value
    };

    try {
        // API so‘rov (backend endpoint’ni o‘zingizga moslashtiring)
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            messageDiv.textContent = 'Registration successful! Redirecting...';
            messageDiv.style.color = '#10b981';
            messageDiv.classList.add('show');

                        const role = result.data.user.role 
            console.log(result, result.data.user, "resultttttt")
            console.log(result.data.user.role)
            let redirectUrl = 'home.html'; 

            if (role == 'seller') {
                redirectUrl = '../dashboards/seller.html';
            } else if (role == 'admin') {
                redirectUrl = '../dashboards/admin.html';
            } else if (role == 'user') {
                redirectUrl = '../dashboards/home.html';
            }

            form.classList.add('success-animation');
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1500);
        } else {
            messageDiv.textContent = result.message || 'Registration failed. Please try again.';
            messageDiv.style.color = '#ef4444';
            messageDiv.classList.add('show');
        }
    } catch (error) {
        messageDiv.textContent = 'An error occurred. Please try again.';
        messageDiv.style.color = '#ef4444';
        messageDiv.classList.add('show');
    } finally {
        // Animatsiyani to‘xtatish
        button.classList.remove('loading');
        button.textContent = 'Register';
        button.disabled = false;
    }
});

// Muvaffaqiyat animatsiyasi uchun CSS
const style = document.createElement('style');
style.textContent = `
    .register-button.loading {
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
`;
document.head.appendChild(style);