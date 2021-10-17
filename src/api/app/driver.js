import {axios} from "../index";

const driver = {
    create: async function (formData) {
        return await axios.post('/app/driver', formData)
    },
    createPassword: async function (formData) {
        return await axios.post('/driver/create_password', formData)
    },
    update: async function (formData, id) {
        return await axios.put(`/app/driver`, formData)
    },
    updateImage: async function (formData) {
        return await axios.put('/app/driver/image', formData)
    },
    getDriver: async function(source, id) {
        return await axios.get(`/app/driver/${id}`, {cancelToken: source.token})
    },
    getLoggedDrivers: async function(source, id) {
        return await axios.get(`/app/drivers/${id}`, {cancelToken: source.token})
    },
    getDrivers: async function(source) {
        return await axios.get('/app/drivers', {cancelToken: source.token})
    },
    getVehicles: async function(source) {
        return await axios.get('/app/vehicles', {cancelToken: source.token})
    },
    getImage: async function () {
        return await axios.get('/app/driver/image')
    },
    removeDrivers: async (id) => {
        return await axios.put(`/app/driver/remove-vehicle/${id}`)
    }
}

export default driver