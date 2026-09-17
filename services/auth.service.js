import { loginUsers } from "../loginData.js";

export const loginUser = (loginPayload) => {
    const { email, password } = loginPayload;
    const user = loginUsers.find(
        (u) => u.email === email && u.password === password,
    );
    return user
}