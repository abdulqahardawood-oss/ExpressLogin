import express from "express";
import dotenv from "dotenv";
import { users } from "./data.js";
import { loginUsers } from "./loginData.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// ==================== GLOBAL MIDDLEWARE ====================

// Parse JSON request bodies
app.use(express.json());

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);


// ==================== AUTH MIDDLEWARE ====================

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header is missing",
    });
  }

  // Authentication logic goes here

  next();
};


// ==================== TESTING MIDDLEWARE ====================

const testingMiddleware = (req, res, next) => {
  console.log("Testing middleware executed");
  next();
};


// ==================== VALIDATION MIDDLEWARE ====================

const validateUser = (req, res, next) => {
  const {
    firstName,
    secondName,
    email,
    phoneNumber,
  } = req.body;

  if (!firstName) {
    return res.status(400).json({
      message: "First name is required",
    });
  }

  if (!secondName) {
    return res.status(400).json({
      message: "Second name is required",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!phoneNumber) {
    return res.status(400).json({
      message: "Phone number is required",
    });
  }

  next();
};


//  GET ALL USERS 

app.get("/users", checkAuth, (req, res) => {
  res.status(200).json(users);
});


//  GET SINGLE USER 

app.get("/users/:id", checkAuth, (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json(user);
});


// CREATE USER

app.post("/register", checkAuth, validateUser, (req, res) => {
  const {
    firstName,
    secondName,
    email,
    phoneNumber,
  } = req.body;

  const newUser = {
    id: users.length + 1,
    firstName,
    secondName,
    email,
    phoneNumber,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
});


//  GET ALL LOGIN USERS

app.get("/login-users", checkAuth, (req, res) => {
  res.status(200).json(loginUsers);
});

// Get for user login
app.post("/users/login", checkAuth, (req, res) => {
  const { email, password } = req.body;
  const user = loginUsers.find(
    (u) => u.email === email && u.password === password,
  );
  if (!email) {
    return res.status(401).json({ message: "Invalid email" });
  }
  if (!password) {
    return res.status(401).json({ message: "Invalid password" });
  }
  res.json({ message: "Login successful", user });
});


// Dashboard
app.get("/dashboard", checkAuth, (req, res) => {
  const totalRegister = users.length;
  const totalLogin = loginUsers.length;

  res.status(200).json({
    message: "Welcome to your private dashboard",
    totalRegister,
    totalLogin,
  });
});

// TEST ROUTE 

app.get("/test", testingMiddleware, (req, res) => {
  res.status(200).json({
    message: "Test route is working",
  });
});


// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
