import api from "./api";

const login = (email, password) => {
    return api.post("/users/login", {email, password});
}

export {login};