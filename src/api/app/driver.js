import {axios} from "../index";
import store from "../../store";

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
    getDrivers: async function(source) {
        return await axios.get('/app/drivers', {cancelToken: source.token})
    },
    getVehicles: async function(source) {
        return await axios.get('/app/vehicles', {cancelToken: source.token})
    },
    getImage: async function () {
        return await axios.get('/app/driver/image')
    },
}

export default driver