import { SET_LOADING,SET_ALERT,SET_NOTIFY ,SHOW_BOTTOM_SHEET,SET_ENABLED_HOME,SET_BOTTOM_SHEET_INDEX} from "../constants";

const initialState = {
  loading: false,
  notify:false,
  alert:false,
  isEnabled:true,
  bottomSheetIndex:1,
  showBottomSheet:false,
};
// 0 for report modal and 1 for block modal
export const appState = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.data,
      };
      case SET_ALERT:
        return {
          ...state,
          alert: action.data
        };
        case SET_NOTIFY:
          return {
            ...state,
            notify: action.data
          };
        case SET_ENABLED_HOME:
          return {
            ...state,
            isEnabled: action.data
          };
          case SET_BOTTOM_SHEET_INDEX:
            return {
              ...state,
              bottomSheetIndex: action.data
            };
            case SHOW_BOTTOM_SHEET:
              return {
                ...state,
                showBottomSheet: action.data
              };
    default:
      return state;
  }
};
