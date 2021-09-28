import MainRouter from "./router";
import { Provider } from "react-redux";
import store from "./store/index";
import { ToastContainer } from "react-toastify"

// Import Swiper styles
import 'swiper/swiper-bundle.css'

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

function App() {
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
