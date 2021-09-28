import {axios} from "../index"

const stock = {
    create: async (formData) => {
        return await axios.post('/app/daily-stock', formData)
    },
    update: async (formData) => {
        return await axios.put('/app/daily-stock', formData)
    },
    get: async (formData) => {
        return await axios.get('/app/daily-stock')
    },
}

export default stock