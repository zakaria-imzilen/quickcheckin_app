import React, { useEffect, useMemo, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCategories } from "../store/eventSlice";

import { Dialog, Transition } from "@headlessui/react";

import Logo from "../assets/QuickCheckin_black.png";
import { deleteEventOrder } from "../store/shopping-cart/cartSlice";
import { toast } from "react-toastify";

const Navbar = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.event.categories);
    const categoriesResponse = useSelector(
        (state) => state.event.categoriesResponse
    );
    const cart = useSelector((state) => state.cart.tickets);

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

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
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
                                                                {cart.map(
                                                                    (
                                                                        cartEvent
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                cartEvent[0]
                                                                                    .id
                                                                            }
                                                                            className="flex py-6"
                                                                        >
                                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                <img
                                                                                    src={
                                                                                        cartEvent[0]
                                                                                            ?.event
                                                                                            .image
                                                                                    }
                                                                                    alt={
                                                                                        cartEvent[0]
                                                                                            ?.event
                                                                                            .name
                                                                                    }
                                                                                    className="h-full w-full object-cover object-center"
                                                                                />
                                                                            </div>

                                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                                <div>
                                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                        <h3>
                                                                                            {
                                                                                                cartEvent[0]
                                                                                                    ?.event
                                                                                                    .name
                                                                                            }
                                                                                        </h3>
                                                                                        <p className="ml-4 font-bold">
                                                                                            Total:{" "}
                                                                                            {cartEvent[0]
                                                                                                ?.event
                                                                                                .unitPrice *
                                                                                                cartEvent[0]
                                                                                                    ?.qty}{" "}
                                                                                            DH
                                                                                        </p>
                                                                                    </div>
                                                                                    <p className="mt-1 text-sm text-gray-500">
                                                                                        {
                                                                                            cartEvent[0]
                                                                                                ?.event
                                                                                                .category
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                                    <p className="text-gray-500">
                                                                                        {
                                                                                            cartEvent[0]
                                                                                                ?.event
                                                                                                .unitPrice
                                                                                        }{" "}
                                                                                        DH
                                                                                        x
                                                                                        {
                                                                                            cartEvent[0]
                                                                                                ?.qty
                                                                                        }
                                                                                    </p>

                                                                                    <div className="flex">
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                dispatch(
                                                                                                    deleteEventOrder(
                                                                                                        cart.indexOf(
                                                                                                            cartEvent
                                                                                                        )
                                                                                                    )
                                                                                                )
                                                                                            }
                                                                                            type="button"
                                                                                            className="py-2 px-3 rounded-md font-medium text-sm bg-red-500 text-white hover:text-red-500 hover:bg-white transition-all"
                                                                                        >
                                                                                            Remove
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
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
                    className="hidden w-full md:flex md:gap-8 md:w-auto"
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
                    <button
                        to="/Panier"
                        className="border-2 flex gap-3 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white transition-all rounded-md font-sans uppercase px-6 py-2"
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
                        <span>Cart</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
