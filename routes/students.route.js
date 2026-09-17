import express from "express"
import { getStudentController } from "../controllers/students.controller.js"

const router = express.Router()

router.get("/", getStudentController)


export default router;