import {createSlice} from "@reduxjs/toolkit";

const auth = createSlice({
    name: "auth",
    initialState: {user: null, isLogged: false},
    reducers: {
        login: (state, action) => {
            return {...state, user: action.payload, isLogged: true};
        },
        logout: (state, action) => {
            return {...state, user: null, isLogged: false}
        }
    }
});

export const {login, logout} = auth.actions;

export default auth.reducer;

