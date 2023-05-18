import Slide from "./Slide";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
            {/* <Slide /> */}
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Customers also purchased
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {events.map((event) => (
                            <div key={event.id} className="group relative">
                                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={event.event.imageURL}
                                        alt={event.event.name}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={event.event.name}>
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute inset-0"
                                                />
                                                {event.event.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {event.event.description}
                                        </p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {event.event.price}
                                    </p>
                                </div>
                            </div>
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
