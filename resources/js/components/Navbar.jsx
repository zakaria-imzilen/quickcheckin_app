import React, { useEffect, useMemo, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
    fetchCategories,
    resetSearchEvts,
    searchEvent,
} from "../store/eventSlice";

import { Dialog, Transition } from "@headlessui/react";

import Logo from "../assets/QuickCheckin_black.png";
import { toast } from "react-toastify";
import CartContent from "./CartContent";

const Navbar = () => {
    const [search, setSearch] = useState("");

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.event.categories);
    const categoriesResponse = useSelector(
        (state) => state.event.categoriesResponse
    );
    const cart = useSelector((state) => state.cart.prep_tickets);
    const user = useSelector((state) => state.user.loggedIn);
    const searchResp = useSelector((state) => state.event.search);

    const [open, setOpen] = useState(false);

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

    useEffect(() => {
        if (!categoriesResponse.status) {
            toast.error(categoriesResponse.error);
        }
    }, [categories]);

    const handleSearch = ({ target }) => {
        setSearch(target.value);

        dispatch(searchEvent(target.value));
    };

    return (
        <nav className="absolute w-screen bg-transparent border-gray-200 dark:bg-gray-900">
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="rounded-md text-gray-300 hover:text-white focus:ring-white"
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                >
                                                    <span className="sr-only">
                                                        Close panel
                                                    </span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                    Cart
                                                </Dialog.Title>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                {/* Your content */}
                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        {cart.length === 0 ? (
                                                            <h2 className="text-3xl text-center font-sans">
                                                                Empty
                                                            </h2>
                                                        ) : (
                                                            <ul
                                                                role="list"
                                                                className="-my-6 divide-y divide-gray-200"
                                                            >
                                                                <CartContent />
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-10 text-center">
                                                <Link to="/checkout">
                                                    <button className="py-2 px-4 rounded-lg border-t-2 border-green-300 hover:bg-green-400 hover:text-white hover:border-t-0 hover:border-b-2 hover:border-slate-300 transition-all">
                                                        Checkout
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <img
                        src={Logo}
                        className="h-10 w-32  mr-3 object-cover"
                        alt="QuickCheckin Logo"
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
                    className="hidden w-full md:flex md:gap-8 md:w-auto"
                    id="navbar-default"
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <form>
                            <label
                                htmlFor="search"
                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <input
                                    type="search"
                                    id="search"
                                    className="block px-4 py-2 w-60 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search for Events..."
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <button
                                    type="submit"
                                    className="text-white absolute inset-y-0 right-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-3 h-3"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>
                                </button>
                                {searchResp.data.length !== 0 && (
                                    <div className="shadow-lg p-3 bg-white w-60 h-80 overflow-y-scroll overflow-x-hidden absolute -bottom-80 left-0 space-y-3">
                                        {searchResp.data.map((searchedEv) => (
                                            <Link
                                                to={`/event/${searchedEv.slug}`}
                                                className="w-full"
                                                onClick={() => {
                                                    dispatch(resetSearchEvts());
                                                }}
                                            >
                                                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-4 h-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                                        />
                                                    </svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap font-semibold">
                                                        {searchedEv.name
                                                            .length > 16
                                                            ? searchedEv.name.slice(
                                                                  0,
                                                                  16
                                                              ) + "..."
                                                            : searchedEv.name}
                                                        <br />
                                                        <span className="font-normal uppercase text-xs">
                                                            {
                                                                searchedEv.location
                                                            }
                                                        </span>
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </form>

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
                    <button
                        className="border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white transition-all rounded-md font-sans uppercase px-2 py-2"
                        onClick={() => setOpen(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* Auth */}
                    <div className="flex gap-3 items-center">
                        <Link
                            to={user.status === false ? "/login" : "/profile"}
                            className="p-2 bg-sky-300 hover:bg-sky-600 text-white transition-colors rounded-full"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
