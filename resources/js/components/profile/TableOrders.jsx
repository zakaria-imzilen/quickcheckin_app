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
                                    Lmo9awala bla filter
                                </th>
                                <td className="px-6 py-4">VIP</td>
                                <td className="px-6 py-4">Event</td>
                                <td className="px-6 py-4">500 DH</td>
                                <td className="px-6 py-4">Active</td>
                                <td className="px-6 py-4">2023-06-23</td>
                                <td className="px-6 py-4">Casablanca</td>
                                <td className="px-6 py-4">2023-06-08</td>
                            </tr>
                        ))}
                    {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            Lmo9awala bla filter
                        </th>
                        <td className="px-6 py-4">VIP</td>
                        <td className="px-6 py-4">Event</td>
                        <td className="px-6 py-4">500 DH</td>
                        <td className="px-6 py-4">Active</td>
                        <td className="px-6 py-4">2023-06-23</td>
                        <td className="px-6 py-4">Casablanca</td>
                        <td className="px-6 py-4">2023-06-08</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
};

export default TableOrders;
