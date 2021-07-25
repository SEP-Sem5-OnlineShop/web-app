import MainRouter from "./router";
import { Provider } from "react-redux";
import store from "./store";

// Import Swiper styles
import 'swiper/swiper-bundle.css'

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
