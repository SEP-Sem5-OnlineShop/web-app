import {axios} from "../index"

const stock = {
    create: async (formData) => {
        return await axios.post('/app/daily-stock', formData)
    },
    update: async (formData) => {
        return await axios.put('/app/daily-stock', formData)
    },
    get: async (id, source) => {
        return await axios.get(`/app/daily-stock/${id}`, {cancelToken: source.token})
    },
}

export default stock