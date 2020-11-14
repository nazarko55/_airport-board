import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'qs';
import PropTypes from "prop-types";
import NavigationMain from '../navigation-main/NavigationMain'
import FlightsList from './FlightsList';
import { fetchFlightsList } from "../../flights.actions";
import { arrivalsSelector, departuresSelector, dateSelector } from "../../flights.selectors";
import './flightsList.scss'

const FlightsListContainer = props => {

  useEffect(() => props.fetchFlightsList(props.date), [])

  const { search, pathname } = useLocation();
  const direction = pathname.split('/')[1];

  const selectedFlight = qs.parse(search, { ignoreQueryPrefix: true }).selected;

  const flights = selectedFlight
    ? props[direction]
      .filter(flight =>
        flight.flightN.toLowerCase().includes(selectedFlight.toLowerCase()))
    : props[direction];
  console.log(props[direction]);

  return (
    <main className="airport-board__content">
      <section className="flights">
        <NavigationMain />
        <Switch>
          <Route exact path='/'>
            {null}
          </Route>
          <Route path='/:direction' component={() => <FlightsList flights={flights} />} />
        </Switch>
      </section>
    </main>
  )
}
const mapState = state => {
  return {
    arrivals: arrivalsSelector(state),
    departures: departuresSelector(state),
    date: dateSelector(state),
  }
}
const mapDispatch = {
  fetchFlightsList
}

FlightsListContainer.propTypes = {
  arrivals: PropTypes.array.isRequired,
  departures: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  fetchFlightsList: PropTypes.func.isRequired
};
export default connect(mapState, mapDispatch)(FlightsListContainer)