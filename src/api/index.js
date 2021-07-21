import Axios  from 'axios'
import auth from './auth/index'

/*
 * Setup axios
 */
const BASE_URL = 'https://ontheway-backend-auth-api.herokuapp.com/api'
Axios.defaults.baseURL = BASE_URL

export const setAuthToken = (token) => {
    Axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
}

export const fullURL = (path) => {
    return new URL(path, BASE_URL).href
}

export const axios = Axios
export const baseURL = BASE_URL;

export const authApi = auth