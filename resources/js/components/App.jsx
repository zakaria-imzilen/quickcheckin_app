import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Category from "./Category";
import DetailsEvent from "./DetailsEvent";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/category/:categoryId" element={<Category />} />
                <Route path="/event/:slug" element={<DetailsEvent />} />
            </Routes>
        </>
    );
}

export default App;
