# Brainnner - Task Management System

A modern, full-stack Task Management System built with the MERN stack (MongoDB, Express, React, Node.js). This application provides a comprehensive solution for managing personal and team tasks with a sleek, responsive user interface.

## 🚀 Features

- **User Authentication**: Secure Sign Up and Login functionality using JWT and bcrypt.
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
- **Dashboard**: Visual overview of task status and metrics.
- **Responsive Design**: Built with Tailwind CSS and Vite for a fast, mobile-friendly experience.
- **Protected Routes**: Secure access control for authenticated users.
- **Task Filtering & Organization**: Efficiently organize and view tasks.

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern UI library for building interactive interfaces.
- **Vite**: Next-generation frontend tooling for fast builds.
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development.
- **React Router DOM**: For seamless client-side navigation.
- **Axios**: Promise-based HTTP client for API requests.
- **Lucide React**: Beautiful, consistent icons.
- **Recharts**: Composable charting library for React.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express**: Fast, unopinionated web framework for Node.js.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **JWT (JsonWebToken)**: For secure stateless authentication.
- **Bcryptjs**: For password hashing.

## 📂 Project Structure

The project is organized into two main distinct directories:

- **`/frontend`**: Contains the React application (Vite).
- **`/backend`**: Contains the Node.js/Express API server.

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas connection string)

### 📥 Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd brainnner
    ```

2.  **Backend Setup**
    Navigate to the backend directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

3.  **Frontend Setup**
    Navigate to the frontend directory and install dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

## ⚙️ Configuration

### Backend Environment Variables
Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

> **Note**: Replace `your_mongodb_connection_string` and `your_super_secret_key` with your actual credentials.

## 🚀 Running the Application

### Start the Backend Server
From the `backend` directory:
```bash
npm run dev
# Server will start on http://localhost:5000
```

### Start the Frontend Application
From the `frontend` directory:
```bash
npm run dev
# Application will run on http://localhost:5173 (usually)
```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Users
- `GET /api/users/profile` - Get user profile (Protected)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request