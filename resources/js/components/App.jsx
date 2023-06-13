import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import routes from "../utils/routes";
import { useSelector } from "react-redux";

function App() {
    const role = useSelector((state) => state.user.loggedIn.role);
    return (
        <>
            <Routes>
                {routes[role].map((route) => (
                    <Route
                        exact={route.id === 1}
                        path={route.path}
                        element={
                            route.path === "*" ? (
                                <route.element path={routes[role][0].path} />
                            ) : (
                                <route.element />
                            )
                        }
                    />
                ))}
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
