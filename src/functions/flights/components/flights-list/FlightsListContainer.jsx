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

// 1 - принимаем наши свойства
// 2 - делаем запрос за данными
// 3 - считываем значение с инпута и передаем в query parametr
// 4 - парсим наш url и чтобы обойти начальный вопросительный знак, используем ignoreQueryPrefix
// 5 - далее отрисовуем нашы свойства, делаем фильтрацию по нижнему регистру для каждого номера самолета если операция ложная отрисовуем все маршруты
// 6 - начальный путь по умолчанию null при выборе направления отрисовуем компоненту

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

  // debugger;


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