import api from "./api";

const login = async (email, password) => {
    return api.post("/users/login", {email, password});
}

const logout = async () => {
    return api.get("/users/logout");
}

export {login, logout};