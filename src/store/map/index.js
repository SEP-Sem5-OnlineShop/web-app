import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showMap: false
}

const mapSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage(state, action) {
            state.showMap = action.payload
        },
    }
})

export default mapSlice