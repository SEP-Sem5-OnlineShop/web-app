import { io } from "socket.io-client";

const URL = "http://localhost:8000";
const socket = io(URL, { autoConnect: false });
export const alertSocket = io("http://localhost:8000/alert",{ autoConnect: false })
export const driverCustomerSocket = io("http://localhost:8000/driver",{ autoConnect: false })
export const mapSocket = io("http://localhost:8000/map", { autoConnect: false })

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;