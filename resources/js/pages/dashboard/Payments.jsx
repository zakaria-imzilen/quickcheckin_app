import React, { useEffect } from "react";
import SideBar from "../../components/dashboard/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchSAPayments } from "../../store/userSlice";

const Payments = () => {
    const dispatch = useDispatch();

    const adminPayments = useSelector((state) => state.user.adminPayments);

    useEffect(() => {
        dispatch(fetchSAPayments());
    }, []);

    return (
        <>
            <SideBar />

            <div className="p-4 sm:ml-64">
                <div className="bg-white py-24 sm:py-10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <h1 className="text-5xl font-semibold my-10">
                            Payments
                        </h1>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Credit Card Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Holder Full Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Expiring Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Security Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created_At
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminPayments.status === "pending" && (
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
                                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                        />
                                    </svg>
                                )}

                                {adminPayments.status === true &&
                                    adminPayments.data.map((user) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <div className="text-base">
                                                    {user.creditCardNum}
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.holderFullName}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {user.expiringDate}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.securityNumber}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.created_at}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payments;
