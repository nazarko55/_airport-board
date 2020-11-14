import moment from 'moment';

import {
  SHOW_SPINNER,
  FLIGHTS_DATA_RECIEVED,
  FLIGHTS_DATA_FAILURE,
  CHANGE_SELECTED_FLIGHT
} from './flights.actions';

const initialState = {
  flightsList: [],
  isFetching: false,
  error: null,
  selectedFlight: '',
  date: moment().format('DD-MM-YYYY')
}

export const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SPINNER:
      return {
        ...state,
        isFetching: true,
        flightsList: [],
        error: null
      }
    case FLIGHTS_DATA_RECIEVED:
      return {
        ...state,
        isFetching: false,
        flightsList: action.payload.flightsData,
        error: null
      }
    case FLIGHTS_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        flightsList: [],
        error: action.payload.error
      }
    case CHANGE_SELECTED_FLIGHT:
      return {
        ...state,
        selectedFlight: action.payload.searchText
      }

    default:
      return state;
  }
}