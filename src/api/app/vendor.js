import {axios} from "../index";
const vendor = {
    getVendorPurchaseList: async function (vendor_id) {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
        return await axios.get(`/app/vendor/purchases/${vendor_id}`)
    },
}

export default vendor