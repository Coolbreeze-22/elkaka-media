import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import myRedux from "./myRedux";
import { Provider as MyProvider } from "./context/context";

const store = legacy_createStore(myRedux, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <MyProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MyProvider>
  </Provider>
);

reportWebVitals();
