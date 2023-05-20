import { SET_NOTIFICATIONS,SET_NOTIFICATION_SEEN} from "../constants";

const initialState = {
  notifications:[],
  seen:0,
};
// 0 for report modal and 1 for block modal
export const notifications = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [ ...state.notifications, action.data ],
      };
      case SET_NOTIFICATION_SEEN:
        return {
          ...state,
          seen: action.data,
        };
    default:
      return state;
  }
};
