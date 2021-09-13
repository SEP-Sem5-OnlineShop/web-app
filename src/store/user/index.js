import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    token: "",
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
    }
})

export default userSlice