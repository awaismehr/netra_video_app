import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createReduxStore } from "./config";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
const store = createReduxStore();
// import "./assets/css/icomoon.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,

  document.getElementById("root")
);
