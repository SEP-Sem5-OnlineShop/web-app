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
    getDrivers: async function() {
        return await axios.get('/app/drivers')
    },
    getVehicles: async function() {
        return await axios.get('/app/vehicles')
    },
    getImage: async function () {
        return await axios.get('/app/driver/image')
    },
}

export default driver