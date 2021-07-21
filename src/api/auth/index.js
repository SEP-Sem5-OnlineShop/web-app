import axios from "axios";

const auth =  {
        login : async function (telephone, password) {
        return await axios.post("/login", {
            telephone: telephone,
            password: password
        })
    }
}

export default auth