import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './components/common/FontAwsome';
import AppRouter from './routes';
import configureStore from './store/configureStore';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/App.css';
import './styles/css/Trips.css';

const store = configureStore();

// UI layer
function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
