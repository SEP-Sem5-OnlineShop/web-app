import { io } from "socket.io-client";

const URL = "https://ontheway.thilinatlm.live"
// const URL = "http://localhost:8000"
const socket = io(URL, { autoConnect: false });
export const alertSocket = io(`${URL}/alert`,{ autoConnect: false })
export const driverCustomerSocket = io(`${URL}/driver`,{ autoConnect: false })
export const mapSocket = io(`${URL}/map`, { autoConnect: false })

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;