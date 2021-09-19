import Axios from 'axios';
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

export const listProducts = (vendor_id) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST,});
  try {
    // const { data } = await Axios.get(`/api/products/${vendor_id}`);
    const products = [
      {
        product_id: '1',
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
      },
      {
        product_id: '2',
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
      },
      {
        product_id: '3',
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
      },
      {
        product_id: '4',
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
      },
      {
        product_id: '5',
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
      },
    ];
    const data = products;
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};