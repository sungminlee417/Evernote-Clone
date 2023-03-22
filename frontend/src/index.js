import React from "react";

import "./index.css";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./components/context/Modal";
import App from "./App";

import configureStore from "./store";

import { TagProvider } from "./components/context/TagContext";

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ModalProvider>
          <TagProvider>
            <App />
          </TagProvider>
        </ModalProvider>
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
