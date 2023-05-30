import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { addToCart } from "../store/shopping-cart/cartSlice";
import { displayEventDetails } from "../store/eventSlice";
import { RadioGroup } from "@mui/material";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { toast } from "react-toastify";

const DetailsEvent = () => {
    const { slug } = useParams();

    const { event, packages, category } = useSelector(
        (state) => state.event.currentEvent
    );

    const { status, error } = useSelector(
        (state) => state.event.currentEventResponse
    );

    const [quantityVal, setQuantityVal] = useState(1);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === false) {
            toast.error(error);
            setLoading(false);
        } else if (status === true) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [event]);

    useEffect(() => {
        packages?.length > 0
            ? setSelectedTicket(packages[0].id)
            : setSelectedTicket(null);
    }, [packages]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(displayEventDetails(slug));
    }, [slug]);

    // function add to cart and add details ticket to cart
    const handleAddToCart = () => {
        if (Number(quantityVal) > 0 && selectedTicket !== null) {
            // Current date and time
            const currentDateTime = new Date();
            const year = currentDateTime.getFullYear();
            const month = currentDateTime.getMonth() + 1;
            const day = currentDateTime.getDate();
            const hours = currentDateTime.getHours();
            const minutes = currentDateTime.getMinutes();
            const seconds = currentDateTime.getSeconds();

            // Generates a random number => id_ticket_category
            let randomNumber = Math.random(
                Math.floor(Math.random() * Math.random())
            );

            dispatch(
                addToCart({
                    id_ticket_category: randomNumber,
                    eventPackage: Number(selectedTicket), //referenceTicketId
                    eventId: event.id,
                    quantityValueTicket: Number(quantityVal),
                    event: {
                        name: event.name,
                        category: category.name,
                        unitPrice: packages.filter(
                            (pack) => pack.id === selectedTicket
                        )[0].price,
                        image: event.imageURL,
                    },
                    date: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
                })
            );

            toast.success("Event added to the Cart");
            setSelectedTicket(packages[0].id);
            setQuantityVal(1);
        }
    };

    if (event) {
        return (
            <section className="bg-white">
                {loading ? <Loading /> : ""}
                <Navbar />
                {status === true && (
                    <div className="pt-6">
                        <nav aria-label="Breadcrumb">
                            <ol
                                role="list"
                                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                            >
                                <li className="text-sm">
                                    <Link
                                        href={`/category/${category.id}`}
                                        aria-current="page"
                                        className="font-medium text-black hover:text-blue-500"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-sm">
                                    <Link
                                        href="#"
                                        aria-current="page"
                                        className="font-medium disabled cursor-default text-gray-500 hover:text-gray-600"
                                    >
                                        {event.name}
                                    </Link>
                                </li>
                            </ol>
                        </nav>

                        {/* Image gallery */}
                        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:px-8">
                            <img
                                src={event.imageURL}
                                alt={event.name}
                                className="w-full max-h-96 object-cover object-center"
                            />
                        </div>

                        {/* Product info */}
                        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    {event.name}
                                </h1>
                            </div>

                            {/* Options */}
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <h2 className="text-lg font-sans font-bold mb-5">
                                    Reserve now
                                </h2>

                                <ul className="grid w-full gap-6 md:grid-cols-1">
                                    {packages.map((pack) => (
                                        <li key={pack.id}>
                                            <input
                                                type="radio"
                                                id="hosting-small"
                                                name="hosting"
                                                value={pack.id}
                                                className="hidden"
                                                required
                                            />
                                            <label
                                                onClick={() =>
                                                    setSelectedTicket(pack.id)
                                                }
                                                htmlFor="hosting-small"
                                                className={`inline-flex items-center justify-between w-full p-5 bg-white border rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 ${
                                                    selectedTicket === pack.id
                                                        ? "border-blue-600 dark:text-blue-500 text-blue-600"
                                                        : "border-gray-200  text-gray-500"
                                                } hover:text-white hover:bg-blue-600 transition-all dark:bg-gray-800 dark:hover:bg-gray-700`}
                                            >
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">
                                                        {pack.name}
                                                    </div>
                                                    <div className="w-full">
                                                        {pack.price} MAD
                                                    </div>
                                                </div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                                    />
                                                </svg>
                                            </label>
                                        </li>
                                    ))}
                                </ul>

                                <input
                                    value={quantityVal}
                                    onChange={({ target }) =>
                                        setQuantityVal(Number(target.value))
                                    }
                                    type="number"
                                    className="my-3 w-full rounded-md border-blue-500"
                                />

                                <button
                                    type="button"
                                    className={`flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                        selectedTicket === null
                                            ? "disabled"
                                            : ""
                                    }`}
                                    onClick={() => handleAddToCart()}
                                >
                                    Add to Cart
                                </button>
                            </div>

                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                {/* Event info */}
                                <div>
                                    <h3 className="sr-only">Description</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
    }
};

export default DetailsEvent;
