import {axios} from "../index";

const vendorRequest = {
    create: async function (formData) {
        return await axios.post("/general/vendor/request", formData)
    },
    update: async function (formData) {
        return await axios.put(`/general/vendor/request`, formData)
    },
    getRequest: async function (formData) {
        return await axios.get(`/general/vendor/request/${formData.token}`)
    },
    verifyRequest: async function (formData) {
        return await axios.post('/general/vendor/request/verify', formData)
    }
}

export default vendorRequest