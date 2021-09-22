import MainRouter from "./router";
import { Provider } from "react-redux";
import store from "./store/index";
import { ToastProvider } from 'react-toast-notifications';

// Import Swiper styles
import 'swiper/swiper-bundle.css'

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

function App() {
  return (
      <div className="App">
          <Provider store={store}>
              <MainRouter />
          </Provider>
      </div>
  );
}

export default App;
