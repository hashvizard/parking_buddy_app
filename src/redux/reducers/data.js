import { USER_DATA,LOGGED_IN } from "../constants";

const initialState = {
  userData: {},
  loggedIn: false,
};
// 0 for report modal and 1 for block modal
export const data = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.data,
      };
      case LOGGED_IN:
        return {
          ...state,
          loggedIn: action.data,
        };

    default:
      return state;
  }
};
