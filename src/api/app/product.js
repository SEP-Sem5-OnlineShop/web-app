import {axios} from "../index";
import store from "../../store";

const vendor = {
    create: async function (formData) {
        return await axios.post("/app/product", formData)
    },
    update: async function (formData, id) {
        return await axios.put(`/app/product/${id}`, formData)
    },
    get: async function (id) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
        return await axios.get(`/app/product/${id}`)
    },
    getList: async function () {
        axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
        return await axios.get("/app/products")
    },
    delete: async function (id) {
        return await axios.delete(`/app/product/${id}`)
    },
}

export default vendor