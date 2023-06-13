import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/QuickCheckin_black.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/eventSlice";
import { Menu, Transition } from "@headlessui/react";

const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Header = () => {
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
                            <button
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
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={`${
                                            info.imageURL === ""
                                                ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                : info.imageURL
                                        }`}
                                        alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? "bg-gray-100" : "",
                                                    "block px-4 py-2 text-sm text-gray-700"
                                                )}
                                            >
                                                Your Profile
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? "bg-gray-100" : "",
                                                    "block px-4 py-2 text-sm text-gray-700"
                                                )}
                                            >
                                                Settings
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? "bg-gray-100" : "",
                                                    "block px-4 py-2 text-sm text-gray-700"
                                                )}
                                            >
                                                Sign out
                                            </a>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
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
