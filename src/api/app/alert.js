import {axios} from "../index"

const alert = {
    get: async (id, source) => {
        return await axios.get(`/app/alert/${id}`, {cancelToken: source.token})
    },
}

export default alert