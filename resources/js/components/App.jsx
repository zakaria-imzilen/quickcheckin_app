import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Product from "./Product";
import DetailsEvent from "./DetailsEvent";
import Panier from "./Panier";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/products/:category" element={<Product />} />
                <Route
                    path="/products/:id/DetailsEvent/:idEvent"
                    element={<DetailsEvent />}
                />
                <Route exact path="/Panier" element={<Panier />} />
            </Routes>
        </>
    );
}

export default App;
