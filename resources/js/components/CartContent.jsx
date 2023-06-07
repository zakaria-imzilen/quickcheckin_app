import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventOrder } from "../store/shopping-cart/cartSlice";

const CartContent = () => {
    const cart = useSelector((state) => state.cart.prep_tickets);
    const dispatch = useDispatch();

    return (
        <div>
            {cart.map((event) => {
                return (
                    <li
                        key={event.id_ticket_category}
                        className="flex py-6 w-full"
                    >
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                                src={event.eventDetails.image}
                                alt={event.eventDetails.name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{event.eventDetails.name}</h3>
                                    <p className="ml-4 font-bold">
                                        Total:{" "}
                                        {event.eventDetails.unitPrice *
                                            event.qty}{" "}
                                        DH
                                    </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    {event.eventDetails.category} -{" "}
                                    {event.packageDetails.name}
                                </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                    {event.eventDetails.unitPrice} DH x
                                    {event.qty}
                                </p>

                                <div className="flex">
                                    <button
                                        onClick={() =>
                                            dispatch(deleteEventOrder(event.id))
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
                );
            })}
        </div>
    );
};

export default CartContent;
