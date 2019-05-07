import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import TripsSection from './containers/TripsContainer';
import SearchHeader from './containers/SearchContainer';
import store from './store';

render(
  <Provider store={store}>
    <Fragment>
      <SearchHeader />
      <TripsSection />
    </Fragment>
  </Provider>,
  document.getElementById('trips-app')
);
