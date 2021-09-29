import MainRouter from "./router";
import { Provider } from "react-redux";
import store from "./store/index";
import { ToastContainer } from "react-toastify"
import { io } from "socket.io-client"

// Import Swiper styles
import 'swiper/swiper-bundle.css'

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
const socket = io('http://localhost:8000')


function App() {

    socket.on("hello", (arg) => {
        console.log(arg)
    })

    return (
        <div className="App">
            <Provider store={store}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <MainRouter />
            </Provider>
        </div>
    );
}

export default App;
