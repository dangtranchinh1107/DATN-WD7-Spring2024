import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
<<<<<<< HEAD
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";

=======

import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";


>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
