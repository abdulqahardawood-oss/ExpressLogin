import { loginUser } from "../services/auth.service.js";

export const loginController = (req, res, next) => {
    const user = loginUser(req.body)

    res.json({ message: "Login successful", user });

}


export const registerController = (req, res) => {

}