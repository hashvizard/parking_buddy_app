import {combineReducers} from 'redux';
import {user} from './user';
import {data} from './data';
import {appState} from './appState';
import {bookingState} from './bookingState';
import {mapData} from './mapData';
import {vehicleReducer} from './vehicleReducer';
import {notifications} from './notifications';
const Reducers = combineReducers({
  user, // For Storing User Information
  data,
  appState,
  bookingState,
  mapData,
  vehicleReducer,
  notifications
});

export default Reducers;
