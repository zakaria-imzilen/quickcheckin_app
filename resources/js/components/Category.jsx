import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import Slide from "./Slide";
import { fetchCategoryEvents } from "../store/eventSlice";
import Navbar from "./Navbar";
import Loading from "./Loading";

const Category = () => {
    const { categoryId } = useParams();
    const currentCategoryEvents = useSelector(
        (state) => state.event.currentCategoryEvents
    );

    const categories = useSelector((state) => state.event.categories);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(!(currentCategoryEvents.length > 0));
    }, [currentCategoryEvents]);

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
        <section>
            {loading ? <Loading /> : ""}
            <Navbar />

            <div className="w-full py-10">
                <h1 className="text-center text-7xl font-sans font-black">
                    {currentCategoryName}
                </h1>
            </div>

            <div className="bg-white">
                {currentCategoryEvents.map(({ event }) => (
                    <div
                        key={event.id}
                        className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {event.name}
                            </h2>
                            <p className="mt-4 text-gray-500">
                                {event.description}
                            </p>
                            <button className="mt-6 bg-slate-800 hover:bg-slate-600 hover:scale-95 transition-all text-white py-2 px-6 font-body rounded-md uppercase">
                                <Link to={`/event/${event.slug}`}>Buy</Link>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 grid-rows-1">
                            <img
                                src={event.imageURL}
                                alt={event.name}
                                className="rounded-lg bg-gray-100"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Category;
