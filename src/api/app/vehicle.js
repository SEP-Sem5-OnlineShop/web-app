import {axios} from "../index";

const vehicle = {
    create: async function (formData) {
        return await axios.post("/app/vehicle", formData)
    },
    update: async function (formData, id) {
        return await axios.put(`/app/vehicle/${id}`, formData)
    },
    get: async function (id, source) {
        return await axios.get(`/app/vehicle/${id}`, { cancelToken: source.token})
    },
    getList: async function (source) {
        return await axios.get("/app/vehicles", { cancelToken: source.token})
    },
    delete: async function (id) {
        return await axios.delete(`/app/vehicle/${id}`)
    },
}

export default vehicle