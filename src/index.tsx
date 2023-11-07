import React from "react"; //We are starting
// to using react, without that import
// our application will not work as we expected
import ReactDOM from "react-dom/client"; //Framework for
// building web applications
import "./index.css";
import App from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom"; // import styles

// React DOM will render App element inside element with id root
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
