import axios from "axios";

const vendor = {
    create: async function (formData) {
        return await axios.post("/app/product", formData)
    },
    update: async function (formData, id) {
        return await axios.put(`/app/product/${id}`, formData)
    },
    get: async function (id) {
        return await axios.get(`/app/product/${id}`)
    },
    getList: async function () {
        return await axios.get("/app/products")
    },
    delete: async function (id) {
        return await axios.delete(`//appproduct/${id}`)
    },
}

export default vendor