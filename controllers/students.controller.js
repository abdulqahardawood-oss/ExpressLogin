import  { userRegistrationSchema } from "../schema/schema.js"
import { getAllStudents } from "../services/students.service.js"

export const getStudentController = (req, res)=>{
    const students = getAllStudents()

    res.status(200).json({
        message: "Successfully",
        students
    })


}

export const createNewStudentController = (req, res)=>{
    const result = userRegistrationSchema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({
            msg: result.error.issues
        })
    }

    
    console.log(result.data)
    res.status(200).json({
        message: "Success",
        data: result.data

    })

}