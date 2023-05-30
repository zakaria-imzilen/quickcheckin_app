import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Checkout = () => {
    const cart = useSelector((state) => state.cart.tickets);

    return (
        <div>
            <Navbar />
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
                    <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white uppercase">
                        Checkout
                    </h1>
                </div>

                <div className="mx-auto my-32 max-w-screen-xl">
                    <div className="flex w-full gap-2">
                        <div className="cart w-3/4">
                            <h3 className="text-xl uppercase font-thin">
                                Events
                            </h3>
                            {cart.map((cartEvent) => (
                                <li key={cartEvent[0].id} className="flex py-6">
                                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={cartEvent[0]?.event.image}
                                            alt={cartEvent[0]?.event.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    {cartEvent[0]?.event.name}
                                                </h3>
                                                <p className="ml-4 font-bold">
                                                    Total:{" "}
                                                    {cartEvent[0]?.event
                                                        .unitPrice *
                                                        cartEvent[0]?.qty}{" "}
                                                    DH
                                                </p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {cartEvent[0]?.event.category}
                                            </p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">
                                                {cartEvent[0]?.event.unitPrice}{" "}
                                                DH x{cartEvent[0]?.qty}
                                            </p>

                                            <div className="flex">
                                                <button
                                                    // onClick={() =>
                                                    //     dispatch(
                                                    //         deleteEventOrder(
                                                    //             cart.indexOf(
                                                    //                 cartEvent
                                                    //             )
                                                    //         )
                                                    //     )
                                                    // }
                                                    type="button"
                                                    className="py-2 px-3 rounded-md font-medium text-sm bg-red-500 text-white hover:text-red-500 hover:bg-white transition-all"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </div>
                        <div className="summary flex flex-col gap-y-5"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Checkout;
