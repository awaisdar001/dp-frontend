import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from './routes';
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
