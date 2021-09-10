import Axios from 'axios';
import {
  VENDOR_DETAILS_FAIL,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
} from '../constants/vendorConstants';

export const listVendors = () => async (dispatch) => {
  dispatch({ type: VENDOR_LIST_REQUEST,});
  try {
    const { data } = await Axios.get(`/vendors`);
    dispatch({ type: VENDOR_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VENDOR_LIST_FAIL, payload: error.message });
  }
};

export const detailsVendor = (vendorId) => async (dispatch) => {
  dispatch({ type: VENDOR_DETAILS_REQUEST, payload: vendorId });
  try {
    // const { data } = await Axios.get(`/vendors/${vendorId}`);
    const vendor =
    {
      vendor_id: "1",
      vendor_name: "Yummy Backers",
      vendor_description: "Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy.",
      rating: '4.0',
      ratingCount: 50,
    };
    const data = vendor;
    dispatch({ type: VENDOR_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VENDOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};