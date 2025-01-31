document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Login failed');
        }

        // If login successful, store the token and redirect
        if (result.token) {
            localStorage.setItem('token', result.token);
            window.location.href = '/app.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Failed to login. Please try again.');
    }
}); 