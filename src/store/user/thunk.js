import userSlice from "./index"
import {authApi} from "../../api/index"

import socket, {alertSocket, driverSocket} from "../../socket/index"
import driver from "../../api/app/driver";

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
                const role = data.data.role || ""
                const userID = data.data._id || ""
                const username = data.data.telephone || ""
                socket.auth = {role, userID, username}
                socket.connect();
                alertSocket.emit("join", {userId: data.data._id})
                alertSocket.on("connect", () => {
                    dispatch(userSlice.actions.setSocketId(alertSocket.id))
                })
                if(role === "driver" || role === "customer") {
                    driverSocket.auth = {role, userID, username}
                    driverSocket.connect()
                    driverSocket.on("driver:session", ({sessionID}) => {
                        window.localStorage.setItem("sessionID", sessionID)
                    })
                    driverSocket.emit("driver:login", {userId: data.data._id})
                }
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
            if(getState().user.role === "driver"){
                driverSocket.emit("driver:logout", {userId: getState().user.userData._id})
                window.localStorage.removeItem("sessionID")
            }
            socket.disconnect()
            dispatch(userSlice.actions.setUserData({}))
            dispatch(userSlice.actions.setAuthToken(""))
            dispatch(userSlice.actions.setRole("guest"))
            dispatch(userSlice.actions. setIsLogin("no"))
            window.localStorage.removeItem("userData")
            window.localStorage.setUserData("token", "")
            window.localStorage.setItem("role", "guest")
            window.localStorage.setItem("isLogin", "no")
        }
        catch (error) {

        }
    }
} 