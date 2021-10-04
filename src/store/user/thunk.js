import userSlice from "./index"
import {authApi} from "../../api/index"

import socket from "../../socket/index"

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
                dispatch(userSlice.actions.setIsLogin("yes"))
                const role = data.data.role
                socket.auth = {username, role}
                socket.connect();
                socket.on("connect", () => {
                    dispatch(userSlice.actions.setSocketId(socket.id))
                    console.log(socket.id)
                })
            }
            return {status, data}
        }
        catch (error) {

        }
    };
}

export function signOUt() {
    return async (dispatch, getState) => {
        try {
            const {status, data} = await authApi.logout()
            socket.emit("remove-user", getState().user.socketId)
            socket.disconnect()
            dispatch(userSlice.actions.setUserData({}))
            dispatch(userSlice.actions.setAuthToken(""))
            dispatch(userSlice.actions.setRole("guest"))
            dispatch(userSlice.actions.setIsLogin("no"))
            window.localStorage.removeItem("userData")
            window.localStorage.setUserData("token", "")
            window.localStorage.setItem("role", "guest")
        }
        catch (error) {

        }
    }
} 