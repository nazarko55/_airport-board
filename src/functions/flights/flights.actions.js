import * as flightsGateway from './flights.gateway';

export const SHOW_SPINNER = 'FLIGHTS/SHOW_SPINNER';
export const FLIGHTS_DATA_RECIEVED = 'FLIGHTS/FLIGHTS_DATA_RECIEVED';
export const FLIGHTS_DATA_FAILURE = 'FLIGHTS/FLIGHTS_DATA_FAILURE';
export const CHANGE_SELECTED_FLIGHT = 'FLIGHTS/CHANGE_SELECTED_FLIGHT';

export const showSpinner = () => {
  return {
    type: SHOW_SPINNER
  }
}

export const flightsDataRecieved = flightsData => {
  return {
    type: FLIGHTS_DATA_RECIEVED,
    payload: {
      flightsData
    }
  }
}

export const flightsDataError = error => {
  return {
    type: FLIGHTS_DATA_FAILURE,
    payload: {
      error
    }
  }
}
export const changeSelectedFlight = searchText => {
  return {
    type: CHANGE_SELECTED_FLIGHT,
    payload: {
      searchText
    }
  }
}

export const fetchFlightsList = date => {
  return dispatch => {
    dispatch(showSpinner())
    flightsGateway.getFlightList(date)
      .then(flights => dispatch(flightsDataRecieved(flights)))
      .catch(error => alert(error.message))
  }
}