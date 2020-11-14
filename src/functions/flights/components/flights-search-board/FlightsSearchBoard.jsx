import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import qs from 'qs';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectedFlightSelector } from '../../flights.selectors';
import { changeSelectedFlight } from '../../flights.actions';
import './flightsSearchBoard.scss';


const FlightsSearchPanel = ({ selectedFlight, changeSelectedFlight }) => {
  let { search, pathname } = useLocation();

  const direction = pathname === '/' ? '/departures' : pathname;

  const initialSelectedFlight = qs.parse(search, { ignoreQueryPrefix: true }).selected;

  useEffect(() => {
    if (initialSelectedFlight) {
      changeSelectedFlight(initialSelectedFlight)
    }
  }, [search])

  return (
    <header className='airport-board__header'>
      <h1 className='airport-board__title'>Search Flight</h1>
      <form className="searach-flight">
        <input
          type="text"
          className="searach-flight__input"
          name='searach-flight__input'
          placeholder='Select flight #'
          value={selectedFlight}
          onChange={e => changeSelectedFlight(e.target.value)}
        />
        <i className="search-icon fa fa-search" />
        <Link to={`${direction}?selected=${selectedFlight}`}>
          <button className="searach-flight__btn">Search</button>
        </Link>
      </form>
    </header>
  )
}

const mapState = state => {
  return {
    selectedFlight: selectedFlightSelector(state)
  }
}

const mapDispatch = {
  changeSelectedFlight
}

FlightsSearchPanel.propTypes = {
  selectedFlight: PropTypes.string.isRequired,
  changeSelectedFlight: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(FlightsSearchPanel)