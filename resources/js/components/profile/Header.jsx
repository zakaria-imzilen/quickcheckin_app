import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/QuickCheckin_black.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/eventSlice";

const Header = (props) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.event.categories);
    const { info, status } = useSelector((state) => state.user.loggedIn);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return (
        <div>
            <nav className="bg-transparent border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <img
                            src={Logo}
                            className="h-10 w-32 mr-3 object-cover"
                            alt="Flowbite Logo"
                        />
                    </Link>
                    <div className="flex items-center md:order-2">
                        <button
                            type="button"
                            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full object-cover"
                                src={props.infoUser[0].photoURL}
                                alt="user photo"
                            />
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div
                            className="z-50 hidden my-4 text-base list-none bg-transparent divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                            id="user-dropdown"
                        >
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">
                                    {info.firstName} {info.lastName}
                                </span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                                    {info.email}
                                </span>
                            </div>
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                {categories.map((category) => (
                                    <Link
                                        to={`/category/${category.id}`}
                                        key={category.id}
                                        className="p-2 px-3 rounded-md transition-colors hover:bg-blue-700 hover:text-white text-slate-600"
                                    >
                                        <li
                                            className="block py-2 pl-3 pr-4 rounded md:p-0"
                                            aria-current="page"
                                        >
                                            {category.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                        <button
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2"
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
                                    fill-rule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {categories.map((category) => (
                                <Link
                                    to={`/category/${category.id}`}
                                    key={category.id}
                                    className="p-2 px-3 rounded-md transition-colors hover:bg-blue-700 hover:text-white text-slate-600"
                                >
                                    <li
                                        className="block py-2 pl-3 pr-4 rounded md:p-0"
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
        </div>
    );
};

export default Header;
