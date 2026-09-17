import { getAllStudents } from "../services/students.service.js"

export const getStudentController = (req, res)=>{
    const students = getAllStudents()

    res.status(200).json({
        message: "Successfully",
        students
    })


}