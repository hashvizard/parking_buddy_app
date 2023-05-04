import { SET_USER_VEHICLE_DATA } from "../constants";

const initialState = {
  myVehicle: {
    vehicles: [],
    selectedVehicle:{}
  },
};
// 0 for report modal and 1 for block modal
export const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_VEHICLE_DATA:
      return {
        ...state,
        myVehicle: { ...state.myVehicle, ...action.data },
      };
    default:
      return state;
  }
};
