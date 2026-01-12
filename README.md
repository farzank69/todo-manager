# Todo Manager - Full Stack Application

A production-grade task management application built with React.js, Node.js, Express, and MongoDB with Firebase authentication.

## Features

- User authentication with email verification via Firebase
- Create and manage multiple boards
- Full CRUD operations on boards and todos
- Status tracking (Pending, In Progress, Completed)
- Priority levels (Low, Medium, High)
- Due date management
- Real-time statistics dashboard
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React.js with Vite
- React Router for navigation
- Axios for API requests
- Firebase Authentication
- Tailwind CSS (CDN)

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- Firebase Admin SDK
- JWT authentication via Firebase tokens
- MVC architecture

## Project Structure

```
Todo Manager/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── firebase.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── board.controller.js
│   │   └── todo.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Board.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── board.routes.js
│   │   └── todo.routes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── PrivateRoute.jsx
    │   │   ├── BoardCard.jsx
    │   │   ├── BoardModal.jsx
    │   │   ├── TodoCard.jsx
    │   │   └── TodoModal.jsx
    │   ├── config/
    │   │   └── firebase.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── BoardView.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   └── dataService.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── .env.example
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB installed and running locally or MongoDB Atlas account
- Firebase project created in Firebase Console

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
PORT=5002
MONGODB_URI=your-mongodb-uri
NODE_ENV=development

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5002

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
VITE_API_URL=http://localhost:5002/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

5. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## API Endpoints

### Authentication
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Boards
- `GET /api/boards` - Get all boards
- `GET /api/boards/:id` - Get board by ID
- `POST /api/boards` - Create new board
- `PUT /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board

### Todos
- `GET /api/todos/board/:boardId` - Get todos by board
- `GET /api/todos/:id` - Get todo by ID
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

All endpoints except health check require Bearer token authentication.

## Usage

1. Register a new account with email and password
2. Check your email for verification link
3. Verify your email address
4. Login with your credentials
5. Create boards to organize your tasks
6. Add todos to your boards
7. Manage todo status, priority, and due dates
8. Track progress with the dashboard statistics

## Database Schema

### User
- firebaseUid: String (unique)
- email: String (unique)
- displayName: String
- createdAt: Date
- lastLogin: Date

### Board
- title: String (required)
- description: String
- userId: ObjectId (ref: User)
- color: String
- createdAt: Date
- updatedAt: Date

### Todo
- title: String (required)
- description: String
- boardId: ObjectId (ref: Board)
- userId: ObjectId (ref: User)
- status: String (pending/in-progress/completed)
- priority: String (low/medium/high)
- dueDate: Date
- createdAt: Date
- updatedAt: Date

## Architecture

The application follows MVC (Model-View-Controller) architecture:

### Backend
- **Models**: Define data structure and database schemas
- **Controllers**: Handle business logic and request processing
- **Routes**: Define API endpoints and link to controllers
- **Middleware**: Handle authentication and request validation
- **Config**: Database and Firebase configuration

### Frontend
- **Components**: Reusable UI components
- **Pages**: Main application views
- **Context**: Global state management (Auth)
- **Services**: API communication layer
- **Config**: Firebase client configuration

## Security Features

- Firebase Authentication with email verification
- JWT token validation on every API request
- Protected routes on frontend
- User-specific data access control
- Environment variable for sensitive data
- CORS configuration

## Development

### Backend Development
```bash
cd backend
npm run dev
```

Uses nodemon for auto-restart on file changes.

### Frontend Development
```bash
cd frontend
npm run dev
```

## Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

The build output will be in the `dist` directory.

## Notes

- Ensure MongoDB is running before starting the backend
- Firebase credentials must be properly configured for authentication to work
- The frontend expects the backend to be running on port 5002
- Email verification is required before accessing the dashboard
- All todos are automatically deleted when their parent board is deleted

