import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import Slide from "./Slide";
import { fetchCategoryEvents } from "../store/eventSlice";
import Navbar from "./Navbar";
import Loading from "./Loading";
import EventsList from "./EventsList";

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
        dispatch(fetchCategoryEvents(categoryId, 0));
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

            <EventsList page="category" />
        </section>
    );
};

export default Category;
