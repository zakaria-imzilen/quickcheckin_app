import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "../pages/Home";
import Category from "../pages/Category";
import DetailsEvent from "../pages/DetailsEvent";
import Checkout from "../pages/Checkout";
import SignUp from "./auth/SignUp";
import LogIn from "./auth/LogIn";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/category/:categoryId" element={<Category />} />
                <Route path="/event/:slug" element={<DetailsEvent />} />
                <Route path="/checkout" element={<Checkout />} />
                {/* Auth */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
