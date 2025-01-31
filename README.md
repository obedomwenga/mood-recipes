# MoodRecipe - Mood-Based Recipe Recommendations

A web application that suggests recipes based on your emotional state. Get personalized recipe recommendations that match your current mood!

## 🌟 Features

- 🔐 User Authentication (Signup/Login)
- 😊 Mood-based recipe matching
- 🎯 Personalized recommendations
- 📱 Responsive design
- 🔒 Secure password handling
- 🍳 Growing recipe database

## 🛠️ Tech Stack

- **Frontend:**
  - HTML5
  - Tailwind CSS
  - Vanilla JavaScript

- **Backend:**
  - Node.js
  - Express.js
  - SQLite3

- **Authentication:**
  - JWT (JSON Web Tokens)
  - bcryptjs for password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm

### Installation

1. Clone the repository

bash
git clone https://github.com/obedomwenga/mood-recipes.git
cd mood-recipes

2. Install dependencies

bash
npm install

3. Start the server

bash
npm start

4. Open your browser and visit `http://localhost:3000`

## 📁 Project Structure

mood-recipes/
├── public/ # Static files
│ ├── js/ # Client-side JavaScript
│ │ └── index.html # Landing page
│ │ └── login.html # Login page
│ │ └── signup.html # Registration page
│ │ └── app.html # Main application
│ │
│ ├── server/ # Backend code
│ │ ├── middleware/ # Express middleware
│ │ │ └── auth.js # Authentication middleware
│ │ │
│ │ ├── auth.js # Auth routes
│ │ ├── database.js # Database setup
│ │ └── server.js # Express server
│ │
│ ├── package.json # Dependencies
│ ├── postcss.config.js # PostCSS configuration
│ └── .gitignore # Git ignore rules
│
└── README.md # This file

## 💡 Usage

1. **Create an Account**
   - Visit the signup page
   - Enter your details
   - Create your account

2. **Login**
   - Use your email and password
   - Access your personalized dashboard

3. **Get Recipe Recommendations**
   - Select your current mood
   - Receive a matching recipe
   - Try different moods for various recipes

## 🔄 Available Moods

- 😊 Happy
- 😢 Sad
- 😴 Tired
- 😰 Stressed
- 🏆 Accomplished
- 💡 Inspired
- 😌 Peaceful

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API endpoints
- Secure cookie handling

## 🛣️ API Endpoints

- **Authentication**
  - `POST /api/auth/signup` - Create new account
  - `POST /api/auth/login` - User login

- **Recipes**
  - `GET /api/recipe/:mood` - Get recipe by mood

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Recipe data curated for mood-based recommendations
- Built with modern web technologies
- Inspired by the connection between food and mood

## 📧 Contact

Obed Omwenga - [@obedomwenga](https://github.com/obedomwenga)

Project Link: [https://github.com/obedomwenga/mood-recipes](https://github.com/obedomwenga/mood-recipes)
