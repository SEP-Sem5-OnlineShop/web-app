import userSlice from "./index"
import {authApi} from "../../api/index"

import {driverCustomerSocket} from "../../socket/index"
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
                localStorage.setItem("refreshToken", data.refreshToken)
                const role = data.data.role || ""
                const userID = data.data._id || ""
                const username = data.data.telephone || ""
                if(role === "driver" || role === "customer") {
                    driverCustomerSocket.auth = {role, userID, username}
                    driverCustomerSocket.connect()
                    driverCustomerSocket.on("driver:session", ({sessionID}) => {
                        window.localStorage.setItem("sessionID", sessionID)
                    })
                    await driverCustomerSocket.emit("join", {userId: userID})
                    await driverCustomerSocket.emit("driver:login", {userId: data.data._id})
                }
                if(role === "customer") {
                    Notification.requestPermission().then((result) => {
                        if (result === 'granted') {
                            driverCustomerSocket.on("distance-alert:set", (data) => {
                                const title = 'OnTheWay'
                                const body = `A mobile vendor of ${data.driver ? data.driver.shop : ""} near in your area. Driver's name: ${data.firstName || ""} ${data.lastName || ""} Vehicle: ${data.driver && data.driver.vehicle ? data.driver.vehicle.brand : ""} ${data.driver && data.driver.vehicle ? data.driver.vehicle.model : ""}`;
                                // const img = `data/img/${games[randomItem].slug}.jpg`;
                                const options = {
                                    body: body,
                                    // icon: notifImg,
                                };
                                new Notification(title, options);
                            })
                        }
                    });
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
            const sessionID = await window.localStorage.getItem("sessionID")
            driverCustomerSocket.emit("all:logout", {sessionId: sessionID})
            if(getState().user.role === "driver"){
                await driverCustomerSocket.emit("driver:logout", {userId: getState().user.userData._id})
            }
            driverCustomerSocket.disconnect()
            window.localStorage.removeItem("sessionID")
            dispatch(userSlice.actions.setUserData({}))
            dispatch(userSlice.actions.setAuthToken(""))
            dispatch(userSlice.actions.setRole("guest"))
            dispatch(userSlice.actions. setIsLogin("no"))
            window.localStorage.removeItem("userData")
            window.localStorage.removeItem("sessionID")
            window.localStorage.setUserData("token", "")
            window.localStorage.setItem("role", "guest")
            window.localStorage.setItem("isLogin", "no")
        }
        catch (error) {

        }
    }
} 