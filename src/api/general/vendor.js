import axios from "axios";

const vendor = {
    request: async function (formData) {
        return await axios.post("/vendor/request", formData)
    },
}

export default vendor