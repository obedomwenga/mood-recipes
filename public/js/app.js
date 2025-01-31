// Check if user is authenticated
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
    }
}

// Initialize page
function init() {
    checkAuth();
    displayUsername();
    setupEventListeners();
}

// Display username from token
function displayUsername() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            document.getElementById('username-display').textContent = `Hello, ${payload.username}!`;
        } catch (error) {
            console.error('Error parsing token:', error);
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mood buttons
    document.querySelectorAll('.mood-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.mood-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            getRecipe(button.dataset.mood);
        });
    });

    // New recipe button
    document.getElementById('new-recipe-btn')?.addEventListener('click', () => {
        const activeMoodBtn = document.querySelector('.mood-btn.active');
        if (activeMoodBtn) {
            getRecipe(activeMoodBtn.dataset.mood);
        }
    });

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/login.html';
    });
}

// Get recipe by mood
async function getRecipe(mood) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/recipe/${mood}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recipe');
        }

        const recipe = await response.json();
        
        if (!recipe) {
            alert('No recipe found for this mood. Try another mood!');
            return;
        }

        const recipeContainer = document.getElementById('recipe-container');
        recipeContainer.classList.remove('hidden');

        document.getElementById('recipe-name').textContent = recipe.name;
        document.getElementById('recipe-ingredients').textContent = recipe.ingredients;
        document.getElementById('recipe-instructions').textContent = recipe.instructions;
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching recipe. Please try again.');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init); 