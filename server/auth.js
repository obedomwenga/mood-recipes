const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use environment variable

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        db.get('SELECT * FROM users WHERE email = ? OR username = ?', 
            [email, username], 
            async (err, user) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Database error' });
                }
                if (user) {
                    return res.status(400).json({ 
                        message: user.email === email ? 'Email already registered' : 'Username already taken' 
                    });
                }

                try {
                    // Hash password
                    const hashedPassword = await bcrypt.hash(password, 10);

                    // Insert new user
                    db.run(
                        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                        [username, email, hashedPassword],
                        function(err) {
                            if (err) {
                                console.error('Insert error:', err);
                                return res.status(500).json({ message: 'Error creating user' });
                            }

                            // Create JWT token
                            const token = jwt.sign(
                                { userId: this.lastID, email, username },
                                JWT_SECRET,
                                { expiresIn: '24h' }
                            );

                            // Set cookie
                            res.cookie('token', token, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === 'production',
                                maxAge: 24 * 60 * 60 * 1000 // 24 hours
                            });

                            res.status(201).json({
                                message: 'User created successfully',
                                token,
                                user: {
                                    id: this.lastID,
                                    username,
                                    email
                                }
                            });
                        }
                    );
                } catch (hashError) {
                    console.error('Hashing error:', hashError);
                    return res.status(500).json({ message: 'Error processing password' });
                }
            }
        );
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add this route after the signup route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Check password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Create token
            const token = jwt.sign(
                { userId: user.id, email: user.email, username: user.username },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Set cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 