import Axios  from 'axios'
import auth from './auth/index'
import vendor from './app/vendor'
import driver from './app/driver'
import product from './app/product'
import stock from './app/stock'
import vehicle from "./app/vehicle";
import vendorRequest from "./general/vendorRequest";
import store, {actions} from "../store/index"
import customer from './general/customer';

/*
 * Setup axios  
 */
// const BASE_URL = 'https://ontheway-backend-auth-api.herokuapp.com/api'
const BASE_URL = 'https://ontheway.thilinatlm.live/api'
// const BASE_URL = "http://localhost:8000/api"
Axios.defaults.baseURL = BASE_URL
Axios.defaults.withCredentials = true

const axiosApiInstance = Axios.create()


/**
 * If the access token will be expired then get new access token using the refresh token
 */

Axios.interceptors.request.use( function (config) {
    const state = store.getState()
    setAuthToken(state.user.token)
    return config
});

Axios.interceptors.response.use(async response => {
        return response
    },
    async function (error) {
        const originalRequest = error.config;
        if(
            error && error.response &&
            error.response.status === 401 &&
            error.response.data.message === "Token Expired!") {
            // Force logout and login again
            store.dispatch(actions.user.setUserData({}))
            store.dispatch(actions.user.setAuthToken(""))
            store.dispatch(actions.user.setRole("guest"))
            store.dispatch(actions.user.setIsLogin("no"))
            window.localStorage.removeItem("userData")
            window.localStorage.removeItem("token")
            window.localStorage.setItem("role", "guest")
        }
        else if(
            error && error.response && error.response.status === 401 && error.response.data.message === "Session is invalid!") {
            const refreshToken = window.localStorage.getItem("refreshToken")
            const data = await auth.token(refreshToken)
            if(data && data.data) {
                setAuthToken(data.data.accessToken)
                window.localStorage.setItem("token", data.data.accessToken)
                window.localStorage.setItem("refreshToken", data.data.refreshToken)
                originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`
                originalRequest._retry = true;
                return axiosApiInstance(originalRequest)
            }
        }
        else return error
    }
)

export const setAuthToken = (token) => {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const fullURL = (path) => {
    return new URL(path, BASE_URL).href
}

export const axios = Axios
export const baseURL = BASE_URL;

export const authApi = auth
export const vendorApi = vendor
export const driverApi = driver
export const productApi = product
export const stockApi = stock
export const vendorRequestApi = vendorRequest
export const customerApi = customer
export const vehicleApi = vehicle