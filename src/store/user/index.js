import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    token: "",
    role: "guest",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action) {
            Object.assign(state.userData, action.payload)
            window.localStorage.setItem("userData", JSON.stringify(state.userData))
        },
        setAuthToken(state, action) {
            state.token = action.payload
            window.localStorage.setItem("token", state.token)
        },
        setRole(state, action) {
            state.role = action.payload
            window.localStorage.setItem("role", state.role)
        },
    }
})

export default userSlice