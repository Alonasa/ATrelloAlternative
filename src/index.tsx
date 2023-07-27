import React from 'react'; //We are starting
// to using react, without that import
// our application will not work as we expected
import ReactDOM from 'react-dom/client'; //Framework for
// building web applications
import './index.css'; // import styles
import App from './App'; // Import App component

// React DOM will render App element inside element with id root
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

