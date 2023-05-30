import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventOrder } from "../store/shopping-cart/cartSlice";

const CartContent = () => {
    const cart = useSelector((state) => state.cart.tickets);
    const dispatch = useDispatch();

    const eventIds = () => {
        let unique_values = cart
            .map((item) => item.eventId)
            .filter(
                (value, index, current_value) =>
                    current_value.indexOf(value) === index
            );

        return unique_values;
    };

    return (
        <div>
            {eventIds(cart).map((evId) => {
                const eventTickets = cart.filter(
                    (cartEvent) => cartEvent.eventId === evId
                );

                const firstEvent = eventTickets[0];

                return (
                    <li
                        key={firstEvent.id_ticket_category}
                        className="flex py-6 w-full"
                    >
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                                src={firstEvent.event.image}
                                alt={firstEvent.event.name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{firstEvent.event.name}</h3>
                                    <p className="ml-4 font-bold">
                                        Total:{" "}
                                        {firstEvent.event.unitPrice *
                                            eventTickets.length}{" "}
                                        DH
                                    </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    {firstEvent.event.category}
                                </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                    {firstEvent.event.unitPrice} DH x
                                    {eventTickets.length}
                                </p>

                                <div className="flex">
                                    <button
                                        onClick={() =>
                                            dispatch(deleteEventOrder(evId))
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
