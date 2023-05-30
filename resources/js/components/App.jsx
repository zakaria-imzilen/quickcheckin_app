import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Category from "./Category";
import DetailsEvent from "./DetailsEvent";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./Checkout";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/category/:categoryId" element={<Category />} />
                <Route path="/event/:slug" element={<DetailsEvent />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
