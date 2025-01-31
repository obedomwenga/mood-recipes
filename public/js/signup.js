document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    };

    // Basic validation
    if (data.password !== data.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (data.password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Signup failed');
        }

        // If signup successful, store the token and redirect
        if (result.token) {
            localStorage.setItem('token', result.token);
            window.location.href = '/app.html'; // This will now work
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Failed to create account. Please try again.');
    }
}); 