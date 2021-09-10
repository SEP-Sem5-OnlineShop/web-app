import axios from "axios";

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
    test: async function () {
        return await axios.get("/test")
    },
    token: async function() {
        return await axios.get("/token")
    }
}

export default auth