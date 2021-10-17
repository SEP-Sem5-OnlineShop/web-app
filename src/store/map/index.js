import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showMap: false,
    onlineDrivers: [],
}

const mapSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage(state, action) {
            state.showMap = action.payload
        },
        setOnlineDrivers(state, action) {
            state.onlineDrivers = {...state.onlineDrivers, [action.payload._id]: action.payload}
        },
        removeOnlineDriver(state, action) {
            const drivers = {...state.onlineDrivers}
            delete drivers[action.payload]
            state.onlineDrivers = drivers
        }
    }
})

export default mapSlice