import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from './Pages/HomePage';
import TripItem from './Pages/TripItem';
import TripsPage from './Pages/TripsListPage';

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/trips/" exact component={TripsPage} />
      <Route path={["/trip/:slug", '*']} exact component={TripItem} />
    </Switch>
  );
};

export default AppRouter;
