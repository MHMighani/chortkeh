import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reducers from "./redux/reducers";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import App from "./App";
import "bootstrap/dist/css/bootstrap.rtl.css";
import "./fonts/b-nazanin-regular.ttf";
import "./styles.scss";
import { Provider } from "react-redux";
import { ThemeContextProvider } from "./context/themeContext";
import { UserContextProvider } from "./context/userContext";

const store = configureStore({ reducer: reducers, middleware: [thunk] });

ReactDOM.render(
  <Provider store={store}>
    <UserContextProvider>
      <ThemeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeContextProvider>
    </UserContextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
