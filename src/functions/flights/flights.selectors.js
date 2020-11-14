import { createSelector } from "reselect";
import moment from 'moment';
import { flightCreator } from './flights.utilites'

export const allFlightsSelector = state => state.flights.flightsList;
export const isFetchingSelector = state => state.flights.isFetching;
export const errorSelector = state => state.flights.error;
export const selectedFlightSelector = state => state.flights.selectedFlight;
export const dateSelector = state => state.flights.date;

export const departuresSelector = createSelector(
  [allFlightsSelector, dateSelector],
  (flights, date) => {
    if (flights.length === 0) {
      return []
    }

    return [...flights.body.departure]
      .filter(flight => moment(flight.timeDepShedule).format('DD-MM-YYYY') === date)
      .sort((a, b) => moment(a.timeDepShedule).format("HH:mm") - moment(b.timeDepShedule).format("HH:mm"))
      .map(flight => flightCreator(flight, 'departure'));
  }
)
export const arrivalsSelector = createSelector(
  [allFlightsSelector, dateSelector],
  (flights, date) => {
    if (flights.length === 0) {
      return []
    }

    return [...flights.body.arrival]
      .filter(flight => moment(flight.timeToStand).format('DD-MM-YYYY') === date)
      .sort((a, b) => moment(a.timeToStand).format("HH:mm") - moment(b.timeToStand).format("HH:mm"))
      .map(flight => flightCreator(flight, 'arrival'));
  }
) 