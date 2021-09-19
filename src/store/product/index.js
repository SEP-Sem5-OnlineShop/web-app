import {createSlice} from "@reduxjs/toolkit";

const productListSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        error: false,
        products: [],
    },
    reducers: {
        PRODUCT_LIST_REQUEST: state => {
        state.loading = true
        },
        PRODUCT_LIST_SUCCESS: (state, action) => {
        state.products = action.payload
        state.loading = false
        state.error = false
        },
        PRODUCT_LIST_FAIL: (state, action) => {
        state.loading = false
        state.error = action.payload
        },
    },
})

export default productListSlice