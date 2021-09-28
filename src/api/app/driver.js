import {axios} from "../index";
import store from "../../store";

const driver = {
    update: async function (formData, id) {
        return await axios.put(`/app/driver`, formData)
    },
    updateImage: async function (formData) {
        return await axios.put('/app/driver/image', formData)
    },
    getImage: async function () {
        return await axios.get('/app/driver/image')
    },
}

export default driver