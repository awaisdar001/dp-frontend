import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './Pages/HomePage';
import TripsPage from './Pages/TripsListPage';
import TripItem from './Pages/TripItem';

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      {/*<Route path="/trips/" exact component={TripsPage} />*/}
      {/*<Route path="/trip/1" exact component={TripItem} />*/}
    </Switch>
  );
};

export default AppRouter;
