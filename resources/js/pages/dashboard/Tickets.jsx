import React, { useEffect, useState } from "react";
import SideBar from "../../components/dashboard/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { editTicket, fetchSATickets } from "../../store/userSlice";
import EditModal from "../../components/dashboard/EditModal";
import { toast } from "react-toastify";

const Tickets = () => {
    const dispatch = useDispatch();
    // Edit Modal
    const [openEditModal, setOpenEditModal] = useState({
        status: false,
        data: null,
    });

    const adminTickets = useSelector((state) => state.user.adminTickets);

    useEffect(() => {
        dispatch(fetchSATickets());
    }, []);

    const [form, setForm] = useState({ status: null });

    const handleSaveEdit = (id) => {
        let token = document.head.querySelector('meta[name="csrf-token"]');

        console.log(openEditModal.data?.ticket?.status);
        console.log(form.status);
        console.log(id);

        if (form.status !== null) {
            if (openEditModal.data?.ticket?.status !== form.status) {
                dispatch(
                    editTicket({ token, id, data: { status: form.status } })
                );
                dispatch(fetchSATickets());
                setOpenEditModal({ status: false, data: null });
            }
        } else {
            toast.warning("Status did not change");
        }
    };

    return (
        <>
            <SideBar />
            <EditModal
                open={openEditModal}
                setOpen={setOpenEditModal}
                setForm={setForm}
            >
                <form>
                    <label
                        htmlFor="ticket_status"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Edit Ticket Status
                    </label>
                    <select
                        id="ticket_status"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={openEditModal.data?.ticket?.status}
                        value={form.status}
                        onChange={({ target }) =>
                            setForm((prev) => ({
                                ...prev,
                                status: target.value,
                            }))
                        }
                    >
                        <option
                            selected
                            value={openEditModal.data?.ticket?.status}
                        >
                            {openEditModal.data?.ticket?.status}
                        </option>
                        <option
                            value={
                                openEditModal.data?.ticket?.status ===
                                "inactive"
                                    ? "active"
                                    : "inactive"
                            }
                        >
                            {openEditModal.data?.ticket?.status === "inactive"
                                ? "active"
                                : "inactive"}
                        </option>
                    </select>

                    {/* CTAs */}
                    <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                            onClick={() =>
                                handleSaveEdit(openEditModal.data?.ticket?.id)
                            }
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() =>
                                setOpenEditModal({
                                    status: false,
                                    data: null,
                                })
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </EditModal>
            <div className="p-4 sm:ml-64">
                <div className="bg-white py-24 sm:py-10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <h1 className="text-5xl font-semibold my-10">
                            Tickets sold
                        </h1>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Event Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Location
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        User Full Name
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminTickets.status === "pending" && (
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

                                {adminTickets.status === true &&
                                    adminTickets.data.map((ticket) => (
                                        <tr
                                            onClick={() =>
                                                setOpenEditModal({
                                                    status: true,
                                                    data: ticket,
                                                })
                                            }
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <td className="px-6 py-4">
                                                {ticket.ticket.id}
                                            </td>
                                            <th
                                                scope="row"
                                                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={ticket.event.imageURL}
                                                    alt="Jese image"
                                                />
                                                <div className="pl-3">
                                                    <div className="text-base font-semibold">
                                                        {ticket.pack.name}
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {ticket.ticket.date}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {ticket.ticket.status}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {ticket.pack.price} DH
                                            </td>
                                            <td className="px-6 py-4">
                                                {ticket.event.location}
                                            </td>
                                            <td className="px-6 py-4">
                                                {ticket.user.firstName +
                                                    " " +
                                                    ticket.user.lastName}
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

export default Tickets;
