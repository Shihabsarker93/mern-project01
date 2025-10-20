# KeyNest MERN Project

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=flat)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)

## Live Site
[KeyNest Live Demo](https://mern-project01.onrender.com/)

---

## Notes

## Preview

<div align="center">
  <img src="./docs/1.png" alt="KeyNest Homepage" width="45%">
  <img src="./docs/2.png" alt="Create Listing" width="45%">
  <img src="./docs/3.png" alt="Profile Dashboard" width="45%">
  <img src="./docs/4.png" alt="Mortgage Calculator" width="45%">
  <img src="./docs/5.png" alt="About KeyNest" width="45%">
</div>

*Browse properties with our intuitive search and filter interface*

---

## Project Description

KeyNest is a modern **MERN stack real estate application** that helps users buy, sell, and rent properties in desirable neighborhoods. The platform is designed to provide a smooth, user-friendly experience for clients while giving real estate agents the tools they need to manage listings efficiently.

Our mission is to help clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, KeyNest makes the experience seamless and rewarding.

---

## Features & Functionality

- **Property Listings:** Browse available properties for sale or rent with detailed descriptions and images.  
- **Search & Filter:** Find properties by location, price, type, or other criteria.  
- **User Accounts:** Clients and agents can create accounts to save favorites, manage listings, and track transactions.  
- **Property Management for Agents:** Add, edit, or remove property listings efficiently.  
- **Secure Authentication:** Password-protected login with JWT-based authentication.  
- **Responsive Design:** Works seamlessly on desktop and mobile devices.  
- **Smooth User Interaction:** Fast, dynamic frontend built with React for interactive browsing.

---

## Technology Stack

This project is built using the **MERN stack**:

- **MongoDB:** Stores users, properties, and transactions.  
- **Express.js:** Handles backend API requests and business logic.  
- **React.js:** Creates a responsive, dynamic frontend interface.  
- **Node.js:** Provides the server-side runtime environment.  

---

## Architecture

The project follows the **MVC (Model-View-Controller) architecture**:

- **Model:** Manages data and database interactions (MongoDB schemas for users and properties).  
- **View:** Frontend interface (React components) that displays data to users.  
- **Controller:** Business logic and communication between Model and View (Express routes and API controllers).  

This separation ensures the application is organized, scalable, and easy to maintain.

---

## Project Structure

```
Mern_Project/
├── api/
│   ├── controllers/      # Business logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth & validation
│   ├── utils/            # Helper functions
│   └── index.js          # Server entry point
├── client/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # State management
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # React entry point
│   ├── public/           # Static assets
│   └── package.json
├── .env                  # Environment variables (backend)
└── package.json          # Backend dependencies
```

---

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/keynest.git
cd keynest
```

2. **Install backend dependencies:**
```bash
npm install
```

3. **Install frontend dependencies:**
```bash
cd client
npm install
```

4. **Set up environment variables:**

Create a `.env` file in the **root directory**:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

Create a `.env` file in the **client directory**:
```env
VITE_API_URL=http://localhost:3000
```

5. **Run the application:**

Open two terminals:

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

6. **Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---

## Getting Started (Mac Users - Personal Setup)

### 1️⃣ Open Terminal

Open **two terminals** — one for backend, one for frontend.

---

### 2️⃣ Terminal 1 — Backend

1. Navigate to the **root folder** of your project:
```bash
cd ~/Desktop/Mern_Project
```

2. Run the backend:
```bash
npm run dev
```

* This uses **nodemon** to start `api/index.js`.
* You should see:
```
Server is running on port 3000!
Connected to MongoDB!
```

Keep this terminal open while the backend runs.

---

### 3️⃣ Terminal 2 — Frontend

1. Navigate to the **client folder**:
```bash
cd ~/Desktop/Mern_Project/client
```

2. **First-time setup only** (or if `node_modules` was deleted):
```bash
npm install
chmod -R +x node_modules/.bin  # Fix permissions on Mac
```

3. Run the frontend:
```bash
npm run dev
```

* You should see:
```
VITE v5.0.0 ready in 400ms
Local: http://localhost:5173/
```

Open the `Local` URL in your browser to view the React app.

---

* **Stop servers:** press `Ctrl + C` in each terminal.
* **Normal run:** just `npm run dev` in backend and frontend terminals.
* **Backend port:** 3000
* **Frontend port:** 5173 (Vite default)
* **Vulnerabilities warnings:** safe to ignore for development; run `npm audit fix` later if needed.

---

## Optional: Run Both Servers Together

1. Install `concurrently` globally (once):
```bash
npm install -g concurrently
```

2. Add this script to **root `package.json`**:
```json
"scripts": {
  "dev": "nodemon api/index.js",
  "client": "npm run dev --prefix client",
  "serve": "concurrently \"npm run dev\" \"npm run client\""
}
```

3. Run both servers in one terminal:
```bash
cd ~/Desktop/Mern_Project
npm run serve
```

---

## Daily Commands Cheat Sheet (Mac)

### Quick Start (Two Terminals)
```bash
# Terminal 1 - Backend
cd ~/Desktop/Mern_Project
npm run dev

# Terminal 2 - Frontend
cd ~/Desktop/Mern_Project/client
npm run dev
```

### Quick Start (One Terminal with Concurrently)
```bash
cd ~/Desktop/Mern_Project
npm run serve
```

### Stop Servers
Press `Ctrl + C` in terminal(s)

---

## Environment Variables

### Backend `.env` (Root Directory)
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/keynest

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Server
PORT=3000
NODE_ENV=development
```

### Frontend `.env` (Client Directory)
```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Optional: Firebase config for image uploads
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/google` - Google OAuth login

### Users
- `GET /api/user/:id` - Get user profile
- `PUT /api/user/update/:id` - Update user profile
- `DELETE /api/user/delete/:id` - Delete user account

### Properties
- `GET /api/listing/get` - Get all listings
- `GET /api/listing/get/:id` - Get single listing
- `POST /api/listing/create` - Create new listing (Auth required)
- `PUT /api/listing/update/:id` - Update listing (Auth required)
- `DELETE /api/listing/delete/:id` - Delete listing (Auth required)

---

## Troubleshooting

### Port Already in Use
```bash
# Kill backend process (port 3000)
lsof -ti:3000 | xargs kill

# Kill frontend process (port 5173)
lsof -ti:5173 | xargs kill
```

### MongoDB Connection Issues
- Check your `MONGO_URI` in `.env` file
- Ensure MongoDB Atlas cluster is running and IP whitelist is configured
- For local MongoDB, ensure service is running: `brew services start mongodb-community`

### Permission Denied on Mac
```bash
chmod -R +x node_modules/.bin
```

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# For frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

### Vite Not Starting
```bash
cd client
npm cache clean --force
npm install vite@latest
```

---

## Contributing / Testing Changes

* This project is currently being developed on a **test branch**.
* Pull the latest updates and switch branches as needed to test new features.
* Ensure dependencies are installed and permissions are fixed on Mac if first time running.

### Development Workflow
1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test locally
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature-name`
6. Create a Pull Request

---

## Deployment

### Frontend (Render/Vercel/Netlify)
1. Build the frontend: `cd client && npm run build`
2. Deploy the `dist` folder
3. Set environment variables in hosting platform

### Backend (Render/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

---

## Scripts Reference

### Backend Scripts
```bash
npm run dev      # Start with nodemon (development)
npm start        # Start with node (production)
```

### Frontend Scripts
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## License

This project is licensed under the ISC License.

---

## Contact & Support

For questions or issues, please open an issue on GitHub or contact the development team.

**Project Maintainer:** Md Shihab Sarker  
**Email:** md.shihab.sarker@g.bracu.ac.bd  
**GitHub:** [https://github.com/Shihabsarker93](https://github.com/Shihabsarker93)
