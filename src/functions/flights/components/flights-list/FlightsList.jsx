import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { isFetchingSelector } from "../../flights.selectors";
import Flight from './Flight';
import Spinner from '../spinner/Spinner';

const FlightsList = ({ flights, isFetching }) => {
  if (!flights) {
    return null
  }
  if (isFetching) {
    return <Spinner />
  }

  return (
    <table className="flights__list">
      <thead>
        <tr>
          <th>Terminal</th>
          <th>Local time</th>
          <th>Destination</th>
          <th>Status</th>
          <th>Airline</th>
          <th>Flights</th>
        </tr>
      </thead>
      <tbody>
        {
          flights.length === 0
            ? <tr><td className="no-flights" colSpan='6'>No Flights</td></tr>
            : flights.map(flight => (
              <Flight key={flight.id} flight={flight} />
            ))
        }
      </tbody>
    </table>
  )
}

const mapState = state => {
  return {
    isFetching: isFetchingSelector(state),
  }
}

FlightsList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};


export default connect(mapState)(FlightsList)