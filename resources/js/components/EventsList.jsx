import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryEvents, fetchEvents } from "../store/eventSlice";
import Loading from "./Loading";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EventsList = ({ page }) => {
    const events = useSelector((state) => state.event.data);
    const categoryEvents = useSelector(
        (state) => state.event.currentCategoryEvents
    );

    const response = useSelector((state) => state.event.dataResponse);
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
            <div className="my-10 flex justify-center gap-y-4 gap-x-2 flex-wrap max-w-screen-2xl mx-auto">
                {page === "home"
                    ? events.map(({ event }) => (
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
                      ))
                    : categoryEvents.map(({ event }) => (
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
            </div>

            <div className="my-6 text-center mx-auto">
                {/* Loading */}
                {response.status === "pending" && (
                    <svg
                        aria-hidden="true"
                        className="w-8 h-8 mr-2 my-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                )}
                <button
                    onClick={() =>
                        dispatch(
                            page === "home"
                                ? fetchEvents(events.length)
                                : fetchCategoryEvents(categoryEvents.length)
                        )
                    }
                    className="px-4 py-2 rounded-lg bg-blue-400 text-white"
                >
                    LOAD MORE
                </button>
            </div>
        </>
    );
};

export default EventsList;
