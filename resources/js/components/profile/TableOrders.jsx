import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyTickets } from "../../store/userSlice";

const TableOrders = () => {
    const { data, status } = useSelector((state) => state.user.myTickets);
    const { info } = useSelector((state) => state.user.loggedIn);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMyTickets(info.id));
    }, []);

    return (
        <div className="my-20 relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Event
                        </th>
                        <th className="px-6 py-3">Pack</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Event Date</th>
                        <th className="px-6 py-3">Event Location</th>
                        <th className="px-6 py-3">Ticket Booked at</th>
                    </tr>
                </thead>
                <tbody>
                    {data !== null &&
                        data.length > 0 &&
                        data.map((ticket) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {ticket.event.name}
                                </th>
                                <td className="px-6 py-4">
                                    {ticket.pack.name}
                                </td>
                                <td className="px-6 py-4">
                                    {ticket.category.name}
                                </td>
                                <td className="px-6 py-4">
                                    {ticket.pack.price} DH
                                </td>
                                <td
                                    className={`px-6 py-4 ${
                                        ticket.ticket.status === "inactive"
                                            ? "text-red-500"
                                            : "text-sky-500"
                                    }`}
                                >
                                    {ticket.ticket.status}
                                </td>
                                <td className="px-6 py-4">
                                    {ticket.event.date}
                                </td>
                                <td className="px-6 py-4">
                                    {ticket.event.location}
                                </td>
                                <td className="px-6 py-4">
                                    {ticket.ticket.date}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableOrders;
