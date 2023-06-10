import React from "react";
import { useSelector } from "react-redux";

const Stats = () => {
    const stats = useSelector((state) => state.user.stats);

    return (
        <div className="bg-white py-24 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-2">
                    <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dt className="text-base leading-7 text-gray-600">
                            Tickets bought
                        </dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                            {stats?.data?.nbrTickets}
                        </dd>
                    </div>
                    <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dt className="text-base leading-7 text-gray-600">
                            Total DH Spent
                        </dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                            {stats?.data?.totalSpent}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default Stats;
