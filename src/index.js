import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/App.css';

console.log(process.env);

ReactDOM.render(
  <StrictMode>
    <App />,
  </StrictMode>,
  document.getElementById('react-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
