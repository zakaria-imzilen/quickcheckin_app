import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import EventsList from "../components/EventsList";

const Category = () => {
    const { categoryId } = useParams();
    const categories = useSelector((state) => state.event.categories);

    const currentCategoryName = useMemo(() => {
        if (categories.length > 0) {
            return categories.filter((cat) => cat.id == categoryId)[0]?.name;
        }
        return "No";
    }, [categoryId, categories]);

    return (
        <section>
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
