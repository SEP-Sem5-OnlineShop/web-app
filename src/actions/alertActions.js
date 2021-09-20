import Axios from 'axios';
import {
  ALERT_DELETE_FAIL,
  ALERT_DELETE_REQUEST,
  ALERT_DELETE_SUCCESS,
  ALERT_LIST_FAIL,
  ALERT_LIST_REQUEST,
  ALERT_LIST_SUCCESS,
} from '../constants/alertConstants';

export const listAlerts = (customer_id) => async (dispatch) => {
  dispatch({ type: ALERT_LIST_REQUEST,});
  try {
    // const { data } = await Axios.get(`/alerts/${customer_id}`);
    const alerts = [
      {
        alert_id: 1,
        vendor_id: 1,
        vendor_name: "Yummy Backers",
        product_id: '1',
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
      },
      {
        alert_id: 2,
        vendor_id: 1,
        vendor_name: "Yummy Backers",
        product_id: '2',
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
      },
      {
        alert_id: 3,
        vendor_id: 1,
        vendor_name: "Yummy Backers",
        product_id: '3',
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
      },
      {
        alert_id: 4,
        vendor_id: 2,
        vendor_name: "Asta Backers",
        product_id: '4',
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
      },
      {
        alert_id: 5,
        vendor_id: 2,
        vendor_name: "Asta Backers",
        product_id: '5',
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
      },
    ];
    const data = alerts;
    dispatch({ type: ALERT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALERT_LIST_FAIL, payload: error.message });
  }
};


export const deleteAlert = (alertId) => async (dispatch, getState) => {
  dispatch({ type: ALERT_DELETE_REQUEST, payload: alertId });
  // const {
  //   userSignin: { userInfo },
  // } = getState();
  try {
    // const { data } = Axios.delete(`/alerts/${alertId}`, {
    //   headers: { Authorization: `Bearer ${userInfo.token}` },
    // });
    dispatch({ type: ALERT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ALERT_DELETE_FAIL, payload: message });
  }
};