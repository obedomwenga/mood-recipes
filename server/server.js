const express = require('express');
const db = require('./database');
const authRoutes = require('./auth');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// Auth routes
app.use('/api/auth', authRoutes);

// Get random recipe by mood
app.get('/api/recipe/:mood', (req, res) => {
    const mood = req.params.mood;
    db.get(
        'SELECT * FROM recipes WHERE mood = ? ORDER BY RANDOM() LIMIT 1',
        [mood],
        (err, recipe) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(recipe);
        }
    );
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 