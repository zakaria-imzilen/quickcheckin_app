import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { fetchCategories } from "../store/eventSlice";

import Logo from "../assets/QuickCheckin_black.png";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.event.categories);

    const { categoryId } = useParams();
    const currentCategoryName = useMemo(() => {
        if (categories.length > 0) {
            return categories.filter((cat) => cat.id == categoryId)[0]?.name;
        }
        return "LOADING..";
    }, [categoryId, categories]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <img
                        src={Logo}
                        className="h-10 w-32  mr-3 object-cover"
                        alt="Flowbite Logo"
                    />
                </Link>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-default"
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {categories.map((category) => (
                            <Link
                                to={`/category/${category.id}`}
                                key={category.id}
                                className={`p-2 px-3 rounded-md transition-colors ${
                                    category.name === currentCategoryName
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-blue-700 hover:text-white text-slate-600"
                                }`}
                            >
                                <li
                                    className={`block py-2 pl-3 pr-4 rounded md:p-0`}
                                    aria-current="page"
                                >
                                    {category.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
