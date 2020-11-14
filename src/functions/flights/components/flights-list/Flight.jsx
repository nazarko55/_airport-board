import React from 'react';
import classNames from 'classnames';
import PropTypes from "prop-types";

const Flight = ({ flight }) => {
  const {
    term,
    localTime,
    destination,
    status,
    airline,
    flightN
  } = flight;

  const termClass = classNames('flights__list__item_terminal', { 'blue': term === "D" })

  return (
    <tr className="flights__list__item">
      <td className={termClass}>
        <span>{term}</span>
      </td>
      <td>{localTime}</td>
      <td>{destination}</td>
      <td>{status}</td>
      <td className='flights__list__item_airline'>
        <img src={airline.logo} alt="Lable" />
        <span>{airline.name}</span>
      </td>
      <td>{flightN}</td>
    </tr>
  )
}

Flight.propTypes = {
  flight: PropTypes.shape({
    term: PropTypes.string.isRequired,
    localTime: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    airline: PropTypes.shape({
      logo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }),
    flightN: PropTypes.string.isRequired
  })
};

export default Flight