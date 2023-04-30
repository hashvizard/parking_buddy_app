import { SET_USER_DATA ,RESET_SIGNUP} from "../constants";

const initialState = {
  user: {
    mobile_number: null,
    first_name: null,
    last_name: null,
    email_address: null,
    profile_picture: null,
    my_location: null,
    longitude:null,
    latitude:null,
    loggedIn:false,
    socail_id:null,
    login_type:"manual",
  },
};
// 0 for report modal and 1 for block modal
export const user = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SIGNUP:
      return initialState;

    case SET_USER_DATA:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
};
