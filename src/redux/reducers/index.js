import {combineReducers} from 'redux';
import {user} from './user';
import {data} from './data';
import {appState} from './appState';
import {bookingState} from './bookingState';
import {mapData} from './mapData';

const Reducers = combineReducers({
  user, // For Storing User Information
  data,
  appState,
  bookingState,
  mapData
});

export default Reducers;
