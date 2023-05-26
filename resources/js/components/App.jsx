import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Category from "./Category";
import DetailsEvent from "./DetailsEvent";
import Panier from "./Panier";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/category/:categoryId" element={<Category />} />
                <Route path="/event/:slug" element={<DetailsEvent />} />
                <Route path="/Panier" element={<Panier />} />
            </Routes>
        </>
    );
}

export default App;
