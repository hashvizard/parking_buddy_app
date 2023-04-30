import { SET_BOOKING_DATA,SET_MAP_DATA} from "../constants";


const initialState = {
  mapData: {
    searchData: {}, // contains the search  parking data
    selected:{},
    searchResults:[],
    backendData:[],
    place_id:null,
    formatted_address:null,
    vehicle_type: 1,
    selectedTime: null,
    time_duration: null,
    time_duration_unit:"Hours",
    longitude:null,
    latitude:null,
    parkings:[],

  
  },
};
// 0 for report modal and 1 for block modal
export const mapData = (state = initialState, action) => {
  switch (action.type) {

    case SET_MAP_DATA:
      return {
        ...state,
        mapData: {...state.mapData,...action.data},
      };
    default:
      return state;
  }
};
