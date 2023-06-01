import Slide from "./Slide";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { fetchEvents } from "../store/eventSlice";
import Navbar from "./Navbar";
import { useState } from "react";
import Loading from "./Loading";
import { toast } from "react-toastify";
import EventsList from "./EventsList";

const Home = () => {
    return (
        <section>
            <Navbar />

            {/* slide image */}
            <Slide />
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Events List
                    </h2>

                    <div
                        id="events_section"
                        className="mt-6 flex flex-wrap gap-2"
                    >
                        <EventsList />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
