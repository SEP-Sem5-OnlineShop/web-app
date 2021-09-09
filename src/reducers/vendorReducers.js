const {
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_DETAILS_FAIL,
} = require('../constants/vendorConstants');
  
export const vendorListReducer = ( state = { loading: true, vendors: [] }, action ) => {
  switch (action.type) {
    case VENDOR_LIST_REQUEST:
      return { loading: true };
    case VENDOR_LIST_SUCCESS:
      return { loading: false, vendors: action.payload };
    case VENDOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const vendorDetailsReducer = ( state = { vendor: {}, loading: true }, action ) => {
  switch (action.type) {
    case VENDOR_DETAILS_REQUEST:
      return { loading: true };
    case VENDOR_DETAILS_SUCCESS:
      return { loading: false, vendor: action.payload };
    case VENDOR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};