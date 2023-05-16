import "./bootstrap";
import "../css/app.css";
import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);
