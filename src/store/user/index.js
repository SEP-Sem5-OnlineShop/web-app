import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    token: "",
    role: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action) {
            Object.assign(state.userData, action.payload)
        },
        setAuthToken(state, action) {
            state.token = action.payload
        },
        setRole(state, action) {
            state.role = action.payload
        },
    }
})

export default userSlice