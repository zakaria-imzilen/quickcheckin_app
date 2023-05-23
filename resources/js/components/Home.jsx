import Slide from "./Slide";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { fetchEvents } from "../store/eventSlice";

const Home = () => {
    const events = useSelector((state) => state.event.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEvents());
    }, []);

    return (
        <div>
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
            {/* <div className="container"> */}
            {/* <h2 className="text-center mb-5">À ne pas manquer</h2> */}
            {/* <div className="row">
                    {events.map((itemevent) => {
                        return (
                            <div
                                key={itemevent.id}
                                className=" col-sm-10 col-md-6 col-lg-4 mb-5"
                            >
                                <div className="card">
                                    <img
                                        src={itemevent?.event.imageURL}
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h4>
                                            <span className="badge bg-secondary w-4 overflow-hidden">
                                                {itemevent?.event.type}
                                            </span>
                                        </h4>
                                        <h6 className="card-title">
                                            {itemevent?.event.name}
                                        </h6>
                                        <p className="card-text">
                                            {itemevent?.event.location}
                                        </p>
                                        <p className="card-text">
                                            {" "}
                                            05 j 23 h 33 m 50 s
                                        </p>
                                        <div className="row">
                                            À partir de :
                                            <p className=" col card-text">
                                                {itemevent?.packages.length >
                                                    0 &&
                                                    itemevent?.packages[0]
                                                        .price}
                                            </p>
                                            <a
                                                href="#"
                                                className=" col btn btn-primary"
                                            >
                                                J'achete
                                            </a>
                                        </div>
                                        <NavLink
                                            className=" col btn btn-primary"
                                            to={`/products/${itemevent?.event.name}/DetailsEvent/${itemevent?.event.id}`}
                                        >
                                            view details
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div> */}
            {/* </div> */}
        </div>
    );
};

export default Home;
