import {createSlice} from "@reduxjs/toolkit";
import {axios} from "../../api/index"

const initialState = {
    userData: {},
    token: "",
    socketId: "",
    role: "guest",
    isLogin: "no"
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action) {
            Object.assign(state.userData, action.payload)
            window.localStorage.setItem("userData", JSON.stringify(action.payload))
        },
        setAuthToken(state, action) {
            state.token = action.payload
            window.localStorage.setItem("token", state.token)
            if(state.token !== "" || state.token !== "null")
            {axios.defaults.headers.common = {'Authorization': `Bearer ${state.token}`}}
        },
        setRole(state, action) {
            state.role = action.payload
            window.localStorage.setItem("role", state.role)
        },
        setIsLogin(state, action) {
            state.isLogin = action.payload
            window.localStorage.setItem("isLogin", state.isLogin)
        },
        setSocketId(state, action) {
            state.socketId = action.payload
            window.localStorage.setItem("socketId", state.socketId)
        }
    }
})

export default userSlice