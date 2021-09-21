import axios from "axios";

const vendor = {
    request: async function (formData) {
        return await axios.post("/app/vendor/request", formData)
    },
}

export default vendor