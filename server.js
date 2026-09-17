import express from "express";
import dotenv from "dotenv";
import { users } from "./data.js";
import { loginUsers } from "./loginData.js";
import { checkAuth } from "./middlewares/checkAuth.js";
import { validateUser } from "./middlewares/validateUser.js";
import authRoutes from "./routes/auth.route.js"
import studentsRoutes from './routes/students.route.js'

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();


// ==================== GLOBAL MIDDLEWARE ====================

// Parse JSON request bodies
app.use(express.json());
app.use("/auth", authRoutes)
app.use("/students", studentsRoutes)

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);


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

// params
app.get("/users/:name/:email/:age", (req, res) => {
  const { name, email } = req.params;

  res.json({
    name,
    email,
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

app.get("/test",  (req, res) => {
  res.status(200).json({
    message: "Test route is working",
  });
});


// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
