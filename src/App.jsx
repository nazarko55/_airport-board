import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';

import FlightsSearchBoard from './functions/flights/components/flights-search-board/FlightsSearchBoard';
import FlightsListContainer from './functions/flights/components/flights-list/FlightsListContainer'

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='airport-board'>
          <FlightsSearchBoard />
          <FlightsListContainer />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App