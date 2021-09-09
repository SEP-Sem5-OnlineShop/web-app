import Axios from 'axios';
import {
  ALERT_LIST_FAIL,
  ALERT_LIST_REQUEST,
  ALERT_LIST_SUCCESS,
} from '../constants/alertConstants';

export const listAlerts = (customer_id) => async (dispatch) => {
  dispatch({ type: ALERT_LIST_REQUEST,});
  try {
    const { data } = await Axios.get(`/api/alerts/${customer_id}`);
    dispatch({ type: ALERT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALERT_LIST_FAIL, payload: error.message });
  }
};
