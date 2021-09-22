import axios from "axios";

const vendorRequest = {
    create: async function (formData) {
        return await axios.post("/app/vendor/request", formData)
    },
    update: async function (formData) {
        return await axios.put(`/app/vendor/request/${formData.telephone}`, formData)
    },
    getRequest: async function (formData) {
        return await axios.get(`/app/vendor/request/${formData.telephone}`)
    },
}

export default vendorRequest