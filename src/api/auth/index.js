import {axios} from "../index";

const auth = {
    login: async function (telephone, password) {
        return await axios.post("/login", {
            telephone: telephone,
            password: password
        })
    },
    register: async function (formData) {
        return await axios.post("/register", formData)
    },
    logout: async function () {
        return await axios.get("/logout")
    },
    test: async function () {
        return await axios.get("/test")
    },
    token: async function(refreshToken) {
        return await axios.post("/token", {refreshToken: refreshToken})
    },
    updatePassword: async function(formData) {
        return await axios.post("/update-password", formData)
    }
}

export default auth