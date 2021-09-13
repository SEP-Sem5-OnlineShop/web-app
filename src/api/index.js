import Axios  from 'axios'
import auth from './auth/index'

/*
 * Setup axios  
 */
const BASE_URL = 'https://ontheway-backend-auth-api.herokuapp.com/api'
// const BASE_URL = 'http://localhost:8000/api'
Axios.defaults.baseURL = BASE_URL
Axios.defaults.withCredentials = true

const axiosApiInstance = Axios.create()


/**
 * If the access token will be expired then get new access token using the refresh token
 */
Axios.interceptors.response.use(async response => {
        return response
    },
    async function (error) {
        const originalRequest = error.config;
        console.log(originalRequest)
        if(error.response.status === 401) {
            const {status, data} = await auth.token()
            if(status === 401) {
                // Force logout and login again
            }
            else {
                setAuthToken(data.accessToken)
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
                originalRequest._retry = true;
                return axiosApiInstance(originalRequest)
            }
        }
    }
)

export const setAuthToken = (token) => {
    Axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
}

export const fullURL = (path) => {
    return new URL(path, BASE_URL).href
}

export const axios = Axios
export const baseURL = BASE_URL;

export const authApi = auth