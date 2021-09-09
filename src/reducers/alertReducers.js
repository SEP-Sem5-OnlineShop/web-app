const {
  ALERT_LIST_REQUEST,
  ALERT_LIST_SUCCESS,
  ALERT_LIST_FAIL,
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
