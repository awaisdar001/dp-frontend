import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './common/FontAwsome';
import AppRouter from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/App.css';
import './styles/css/Trips.css';
import initializeStore from "./store";

// UI layer
function App() {
  return (
    <div>
      <Provider store={initializeStore()}>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
