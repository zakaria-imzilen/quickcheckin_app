import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Slide from "./Slide";
import { fetchCategoryEvents } from "../store/eventSlice";

const Category = () => {
    const { categoryId } = useParams();
    const currentCategoryEvents = useSelector(
        (state) => state.event.currentCategoryEvents
    );
    const categories = useSelector((state) => state.event.categories);

    const currentCategoryName = useMemo(() => {
        if (categories.length > 0) {
            return categories.filter((cat) => cat.id == categoryId)[0]?.name;
        }
        return "No";
    }, [categoryId, categories]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoryEvents(categoryId));
    }, [categoryId]);

    return (
        <div>
            {/* <Slide /> */}

            <div className="container">
                <h2 className="text-center mb-5 mt-5">{currentCategoryName}</h2>
                <div className="row">
                    {/* map all events by category */}
                    {currentCategoryEvents.length > 0 &&
                        currentCategoryEvents.map((event) => {
                            return (
                                <div
                                    key={event.id}
                                    className=" col-sm-10 col-md-6 col-lg-4 mb-5"
                                >
                                    <div className="card">
                                        <img
                                            src={event.event.imageURL}
                                            className="card-img-top"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {event.event.name}
                                            </h2>
                                            <p className="card-text">
                                                Location:{" "}
                                                {event.event.location.slice(
                                                    0,
                                                    10
                                                )}
                                            </p>
                                            <div className="row">
                                                À partir de :
                                                <p className=" col card-text">
                                                    {event.packages.length >
                                                        0 &&
                                                        event.packages[0]
                                                            .price + " MAD"}
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
                                                to={`/event/${event.event.id}`}
                                            >
                                                view details
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Category;
