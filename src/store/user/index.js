import {createSlice} from "@reduxjs/toolkit";
import {axios} from "../../api/index"

const initialState = {
    userData: {},
    token: "",
    role: "guest",
    isLogin: "no"
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
            if(state.token !== "" || state.token !== "null")
            {console.log("test")
            axios.defaults.headers.common = {'Authorization': `Bearer ${state.token}`}}
        },
        setRole(state, action) {
            state.role = action.payload
            window.localStorage.setItem("role", state.role)
        },
        setIsLogin(state, action) {
            state.isLogin = action.payload
            window.localStorage.setItem("isLogin", state.isLogin)
        }
    }
})

export default userSlice