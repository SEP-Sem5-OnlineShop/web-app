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
            console.log(status, data)
            if (status === 200) {
                console.log(data.data)
                dispatch(userSlice.actions.setUserData(data.data))
                dispatch(userSlice.actions.setAuthToken(data.accessToken))
            }
            return status
        }
        catch (error) {

        }
    };
}