import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import './navigationStyle.scss';

const NavigationMain = () => {
  const { search, pathname } = useLocation();
  const direction = pathname.split('/')[1];

  const arrivalBtnClass = classNames('navigation__btn', 'btn_arrivals', { 'selected': direction === 'arrivals' })
  const departuresBtnClass = classNames('navigation__btn', 'btn_departures', { 'selected': direction === 'departures' })

  return (
    <nav className="flights__navigation navigation">
      <Link to={`/departures${search}`}>
        <button className={departuresBtnClass} >
          <i className="fas fa-plane-departure" />
          <span>Departures</span>
        </button>
      </Link>
      <Link to={`/arrivals${search}`}>
        <button className={arrivalBtnClass} >
          <i className="fas fa-plane-arrival" />
          <span>Arrivals</span>
        </button>
      </Link>
    </nav>
  )
}

export default NavigationMain