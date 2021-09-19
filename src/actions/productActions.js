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
    // const { data } = await Axios.get(`/products/${vendor_id}`);
    const products = [
      { _id:'1',
        product_name: 'Burger with some',
        seller: '613a23c0dd295c38362b2cbe',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
      },
      {
        _id:'2',
        product_name: 'Burger with some',
        seller: '613a23c0dd295c38362b2cbe',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
      },
      {
        _id:'3',
        product_name: 'Burger with some',
        seller: '613a23c0dd295c38362b2cbe',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
      },
      {
        _id:'4',
        product_name: 'Burger with some',
        seller: '613a23c0dd295c38362b2cbe',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
      },
      {
        _id:'5',
        product_name: 'Burger with some',
        seller: '613a23c0dd295c38362b2cbe',
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
    const { data } = await Axios.get(`/products/${productId}`);
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