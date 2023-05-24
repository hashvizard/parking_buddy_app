import { SET_BOOKING_DATA, SET_INTIAL_BOOKING_DATA } from "../constants";

const initialState = {
  booking: {
    searchData: {},
    parking_id: null,
    formatted_address: null,
    booking_id: "2",
    parking_code: "2",
    vehicle_type: 1,
    selectedTime: null,
    time_duration: null,
    time_duration_unit: "Hours",
    longitude: null,
    latitude: null,
    cuponCode: {},
    total_amount: 0,
    pass: {},
    booking_charge: 0,
    gst: 0,
    cgst: 0,
  },
};
// 0 for report modal and 1 for block modal
export const bookingState = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKING_DATA:
      return {
        ...state,
        booking: { ...state.booking, ...action.data },
      };
    case SET_INTIAL_BOOKING_DATA:
      return {
        ...state,
        booking: {
          searchData: {},
          parking_id: null,
          formatted_address: null,
          booking_id: "2",
          parking_code: "2",
          vehicle_type: 1,
          selectedTime: null,
          time_duration: null,
          time_duration_unit: "Hours",
          longitude: null,
          latitude: null,
          cuponCode: {},
          total_amount: 0,
          pass: {},
          booking_charge: 21,
          gst: 9,
          cgst: 9,
        },
      };
    default:
      return state;
  }
};
