import userSlice from "./index"
import {authApi} from "../../api/index"

/**
 * Thunk action
 * Local login
 * @param username
 * @param password
 * @returns {function(*): *}
 */
export function localSignIn(username, password) {
    return async (dispatch) => {
        try {
            const {status, data} = await authApi.login(username, password)
            if (status === 200) {
                dispatch(userSlice.actions.setUserData(data.data))
                dispatch(userSlice.actions.setAuthToken(data.accessToken))
                dispatch(userSlice.actions.setRole(data.data.role))
            }
            return status
        }
        catch (error) {

        }
    };
}

export function signOUt() {
    return async (dispatch) => {
        try {
            const {status, data} = await authApi.logout()
            dispatch(userSlice.actions.setUserData({}))
            dispatch(userSlice.actions.setAuthToken(""))
            dispatch(userSlice.actions.setRole(""))
            window.localStorage.removeItem("userData")
            window.localStorage.removeItem("token")
            window.localStorage.setItem("role", "guest")
        }
        catch (error) {

        }
    }
} 