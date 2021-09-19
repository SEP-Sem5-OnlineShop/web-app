import productListSlice from "./index"
import Axios from 'axios';

export const listProducts = (vendor_id) => async (dispatch) => {
    dispatch(productListSlice.actions.PRODUCT_LIST_REQUEST());
    try {
    //   const { data } = await Axios.get(`/products/${vendor_id}`);
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
      dispatch(productListSlice.actions.PRODUCT_LIST_SUCCESS(data));
    } catch (error) {
      dispatch(productListSlice.actions.PRODUCT_LIST_FAIL(error.message));
    }
  };