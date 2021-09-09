import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { alertListReducer, alertDeleteReducer } from './reducers/alertReducers';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { vendorDetailsReducer, vendorListReducer } from './reducers/vendorReducers';

const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  alertList: alertListReducer,
  alertDelete: alertDeleteReducer,
  vendorList: vendorListReducer,
  vendorDetails: vendorDetailsReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;