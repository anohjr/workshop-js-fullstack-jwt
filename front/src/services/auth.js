import api from "./api";

const login = (email, password) => {
    return api.post("/users/login", {email, password});
}

const logout = () => {
    return api.get("/users/logout");
}

export {login, logout};