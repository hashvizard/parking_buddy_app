import { SET_NOTIFICATIONS,SET_NOTIFICATION_SEEN,EMPTY_NOTIFICATION} from "../constants";

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
        case EMPTY_NOTIFICATION:
          return {
            ...state,
            notifications:[],
            seen:0,
          };
    default:
      return state;
  }
};
