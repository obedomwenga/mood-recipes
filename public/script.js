let currentMood = '';

document.querySelectorAll('.mood-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        currentMood = button.dataset.mood;
        getRecipe(currentMood);
    });
});

document.getElementById('new-recipe-btn').addEventListener('click', () => {
    getRecipe(currentMood);
});

async function getRecipe(mood) {
    try {
        const response = await fetch(`/api/recipe/${mood}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const recipe = await response.json();
        
        if (!recipe) {
            alert('No recipe found for this mood. Try another mood!');
            return;
        }

        // Show recipe with a smooth transition
        const recipeContainer = document.getElementById('recipe-container');
        recipeContainer.classList.remove('hidden');
        recipeContainer.classList.add('animate-fade-in');

        document.getElementById('recipe-name').textContent = recipe.name;
        document.getElementById('recipe-ingredients').textContent = recipe.ingredients;
        document.getElementById('recipe-instructions').textContent = recipe.instructions;
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching recipe. Please make sure the server is running on port 3000');
    }
} 