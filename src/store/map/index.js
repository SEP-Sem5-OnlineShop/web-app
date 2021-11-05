import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showMap: false,
    onlineDrivers: [],
    alertedCustomers: []
}

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setLanguage(state, action) {
            state.showMap = action.payload
        },
        setOnlineDriver(state, action) {
            if(action.payload && action.payload._id)
                state.onlineDrivers = {...state.onlineDrivers, [action.payload._id]: action.payload}
        },
        setOnlineDrivers(state, action) {
            Object.assign(state.onlineDrivers, {...state.onlineDrivers, ...action.payload})
        },
        removeOnlineDriver(state, action) {
            const drivers = {...state.onlineDrivers}
            delete drivers[action.payload]
            state.onlineDrivers = drivers
        },
        setAlertedCustomer(state, action) {
            if(action.payload && action.payload._id)
                state.alertedCustomers = {...state.alertedCustomers, [action.payload._id]: action.payload}
        },
        removeAlertedCustomer(state, action) {
            const customers = {...state.alertedCustomers}
            delete customers[action.payload]
            state.alertedCustomers = customers
        }
    }
})

export default mapSlice