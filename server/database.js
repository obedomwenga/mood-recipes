const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('recipes.db');

// Initialize database
db.serialize(() => {
    // Drop existing tables to start fresh
    db.run("DROP TABLE IF EXISTS recipes");
    db.run("DROP TABLE IF EXISTS users");

    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create recipes table with user_id
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        ingredients TEXT,
        instructions TEXT,
        mood TEXT,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    // Insert some sample data
    const sampleRecipes = [
        {
            name: "Comforting Mac and Cheese",
            ingredients: "Macaroni, cheese, milk, butter, flour",
            instructions: "1. Cook macaroni\n2. Make cheese sauce\n3. Combine and bake",
            mood: "sad"
        },
        {
            name: "Energizing Smoothie Bowl",
            ingredients: "Banana, berries, yogurt, granola, honey",
            instructions: "1. Blend fruits\n2. Top with granola\n3. Drizzle honey",
            mood: "tired"
        },
        {
            name: "Happy Rainbow Salad",
            ingredients: "Mixed greens, cherry tomatoes, carrots, purple cabbage, avocado",
            instructions: "1. Chop vegetables\n2. Mix in bowl\n3. Add dressing",
            mood: "happy"
        },
        {
            name: "Spicy Victory Tacos",
            ingredients: "Ground beef, taco seasoning, lettuce, cheese, hot sauce, corn tortillas, lime",
            instructions: "1. Brown beef with seasoning\n2. Warm tortillas\n3. Assemble with toppings\n4. Squeeze lime",
            mood: "accomplished"
        },
        {
            name: "Stress-Buster Chocolate Lava Cake",
            ingredients: "Dark chocolate, butter, eggs, sugar, flour, vanilla extract",
            instructions: "1. Melt chocolate and butter\n2. Mix in other ingredients\n3. Bake until edges are set but center is gooey",
            mood: "stressed"
        },
        {
            name: "Creative Inspiration Sushi Bowl",
            ingredients: "Sushi rice, nori, salmon, avocado, cucumber, sesame seeds, soy sauce",
            instructions: "1. Cook rice with rice vinegar\n2. Prepare toppings\n3. Arrange artistically\n4. Garnish with sesame",
            mood: "inspired"
        },
        {
            name: "Cozy Rainy Day Ramen",
            ingredients: "Ramen noodles, mushrooms, soft-boiled egg, green onions, nori, chicken broth",
            instructions: "1. Simmer broth with mushrooms\n2. Cook noodles\n3. Add toppings\n4. Serve steaming hot",
            mood: "peaceful"
        }
    ];

    // Insert recipes with null user_id
    const insert = db.prepare("INSERT INTO recipes (name, ingredients, instructions, mood, user_id) VALUES (?, ?, ?, ?, ?)");
    sampleRecipes.forEach(recipe => {
        insert.run(recipe.name, recipe.ingredients, recipe.instructions, recipe.mood, null);
    });
    insert.finalize();
});

// Handle database errors
db.on('error', (err) => {
    console.error('Database error:', err);
});

module.exports = db; 