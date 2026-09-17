import express from "express"
import { createNewStudentController, getStudentController } from "../controllers/students.controller.js"

const router = express.Router()

router.get("/", getStudentController)

router.post("/", createNewStudentController)


export default router;