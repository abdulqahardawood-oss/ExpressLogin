import express from "express";
import { loginController, registerController } from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router()

router.post("/login", checkAuth, loginController )
router.post("/register", registerController)



export default router