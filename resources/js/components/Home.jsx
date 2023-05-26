import Slide from "./Slide";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { fetchEvents } from "../store/eventSlice";
import Navbar from "./Navbar";

const Home = () => {
    const events = useSelector((state) => state.event.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEvents());
    }, []);

    return (
        <div>
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
                        {events.map(({ event }) => (
                            <Link
                                key={event.id}
                                to={`/event/${event.slug}`}
                                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:gap-2 md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <img
                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                    src={event.imageURL}
                                    alt=""
                                />
                                <div className="flex flex-col px-2 justify-between leading-normal">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {event.name}
                                    </h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        {event.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
