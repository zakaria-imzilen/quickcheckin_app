import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/eventSlice";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const EventsList = () => {
    const events = useSelector((state) => state.event.data);
    const dispatch = useDispatch();

    const dataResponse = useSelector((state) => state.event.dataResponse);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(!(events.length > 0));
        if (dataResponse.status === false) {
            toast.error(dataResponse.error);
            setLoading(false);
        }
    }, [events]);

    useEffect(() => {
        dispatch(fetchEvents(0));
    }, []);

    return (
        <>
            {loading ? <Loading /> : ""}
            {events.map(({ event }) => (
                <Link
                    key={event.id}
                    to={`/event/${event.slug}`}
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:gap-2 md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    <img
                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                        src={event.imageURL}
                        alt={event.name}
                    />
                    <div className="flex flex-col px-2 justify-between leading-normal">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {event.name}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {event.description}
                        </p>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default EventsList;
