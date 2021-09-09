const {
  ALERT_LIST_REQUEST,
  ALERT_LIST_SUCCESS,
  ALERT_LIST_FAIL,
  ALERT_DELETE_REQUEST,
  ALERT_DELETE_SUCCESS,
  ALERT_DELETE_FAIL,
  ALERT_DELETE_RESET,
} = require('../constants/alertConstants');
  
export const alertListReducer = ( state = { loading: true, alerts: [] }, action ) => {
  switch (action.type) {
    case ALERT_LIST_REQUEST:
      return { loading: true };
    case ALERT_LIST_SUCCESS:
      return { loading: false, alerts: action.payload };
    case ALERT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const alertDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ALERT_DELETE_REQUEST:
      return { loading: true };
    case ALERT_DELETE_SUCCESS:
      return { loading: false, success: true, alerts: action.payload };
    case ALERT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ALERT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};