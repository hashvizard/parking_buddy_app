import {LOGGED_IN, RESET_SIGNUP, SET_ALERT, SET_BOOKING_DATA, SET_BOTTOM_SHEET_INDEX, SET_ENABLED_HOME, SET_INTIAL_BOOKING_DATA, SET_LOADING, SET_MAP_DATA, SET_NOTIFICATIONS, SET_NOTIFICATION_SEEN, SET_USER_DATA, SET_USER_VEHICLE_DATA, SHOW_BOTTOM_SHEET, USER_DATA} from '../constants';


// Setting user Data
export const setUserData = user => dispatch => {
  return dispatch({
    data: user,
    type: SET_USER_DATA,
  });
}

// EMpty user Data
export const emptyUserSignupData = () => dispatch => {
  return dispatch({
    type: RESET_SIGNUP,
  });
}

// EMpty user Data
export const emptyUserBookingData = () => dispatch => {
  return dispatch({
    type: SET_INTIAL_BOOKING_DATA,
  });
}

// Handling Loading globally
export const loadingState = (loading) => dispatch => {
  return dispatch({
    type: SET_LOADING,
    data: loading
  });
}

// Handling Loading globally
export const setEnabledHome = (show) => dispatch => {
  return dispatch({
    type: SET_ENABLED_HOME,
    data: show
  });
}


// Handling Loading globally
export const bookingData = (data) => dispatch => {
  return dispatch({
    type: SET_BOOKING_DATA,
    data: data
  });
}


// Handling Loading globally
export const vehicleData = (data) => dispatch => {
  return dispatch({
    type: SET_USER_VEHICLE_DATA,
    data: data
  });
}



// Handling Loading globally
export const showBottomSheetContainer = (data) => dispatch => {
  return dispatch({
    type: SHOW_BOTTOM_SHEET,
    data: data
  });
}



// Handling Loading globally
export const setBottomSheetIndex = (data) => dispatch => {
  return dispatch({
    type: SET_BOTTOM_SHEET_INDEX,
    data: data
  });
}

// Handling Loading globally
export const setMapData = (data) => dispatch => {
  return dispatch({
    type: SET_MAP_DATA,
    data: data
  });
}


// Handling Alert globally
export const alertBox = (data) => dispatch => {
  return dispatch({
    type: SET_ALERT,
    data: data,
  });
}

// Setting user Backend Data
export const setUserBackendData = user => dispatch => {
  return dispatch({
    data: user,
    type: USER_DATA,
  });
}


// Setting user Notifications
export const setUserNotifications = userData => dispatch => {
  return dispatch({
    data: userData,
    type: SET_NOTIFICATIONS,
  });
}

// Setting Notifications Seen
export const setNotificationSeen = seen => dispatch => {
  return dispatch({
    data: seen,
    type: SET_NOTIFICATION_SEEN,
  });
}



// Setting user Backend Data
export const setLoggedIn = val => dispatch => {
  return dispatch({
    data: val,
    type: LOGGED_IN,
  });
}


/***  check any pending task in the redux regarding tract
    runnigng pending apis
    hit query in backend use create for mass insert
*/
// export const onlineQuerySync = data => dispatch => new Promise((resolve, reject) => {
//       dispatch(hitOfflineQueries(data))
//         .then(() => {
//           resolve(dispatch({
//             type: RESET_OFFLINE_DATA,
//           }));
//         }).catch(err => {
//           console.log(err);
//           reject(err)
//       });
// })