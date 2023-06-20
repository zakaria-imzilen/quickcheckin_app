import React, { useEffect, useState } from "react";
import SideBar from "../../components/dashboard/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { editUser, fetchSAUsers } from "../../store/userSlice";
import { toast } from "react-toastify";
import EditModal from "../../components/dashboard/EditModal";
import UserForm from "./forms/user";

const Users = () => {
    const dispatch = useDispatch();
    // Edit Modal
    const [openEditModal, setOpenEditModal] = useState({
        status: false,
        data: null,
    });

    const adminUsers = useSelector((state) => state.user.adminUsers);

    const [form, setForm] = useState({
        firstName: null,
        lastName: null,
        email: null,
        pwd: null,
        sexe: null,
        birthDate: null,
    });

    const handleSaveEdit = (id) => {
        let token = document.head.querySelector('meta[name="csrf-token"]');

        // Check if all of them are null
        let nbrNulls = 0;
        Object.values(form).map((val) => val === null && nbrNulls++);
        // IF SO --> WARNING
        // This case might happen if the admin clicked on a row and press direclty on SAVE
        if (nbrNulls === Object.values(form).length) {
            toast.warning("Nothing changed");
        } else {
            const filtredChanges = Object.entries(form).filter(
                (arr) => arr[1] !== null
            );
            const finalArr = Object.fromEntries(filtredChanges);

            dispatch(editUser({ token, id, data: finalArr }));
            dispatch(fetchSAUsers());
            setOpenEditModal({ status: false, data: null });
        }
    };

    useEffect(() => {
        dispatch(fetchSAUsers());
    }, []);

    useEffect(() => {
        if (adminUsers.edit.status === true) {
            toast.success("Changed successfuly");
        } else if (adminUsers.edit.status === false) {
            toast.error("Error occurred");
        }
    }, [adminUsers.edit.status]);

    return (
        <>
            <SideBar />

            {/* << MODAL */}
            <EditModal
                open={openEditModal}
                setOpen={setOpenEditModal}
                setForm={setForm}
            >
                <form>
                    <h3 className="text-xl mb-8">Edit User Data</h3>

                    <UserForm
                        form={form}
                        setForm={setForm}
                        openEditModal={openEditModal}
                        setOpenEditModal={setOpenEditModal}
                    />

                    {/* CTAs */}
                    <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                            onClick={() =>
                                handleSaveEdit(openEditModal.data?.id)
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
            {/* >> MODAL */}

            <div className="p-4 sm:ml-64">
                <div className="bg-white py-24 sm:py-10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <h1 className="text-5xl font-semibold my-10">Users</h1>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Password
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sexe
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Birth Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created_At
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminUsers.status === "pending" && (
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

                                {adminUsers.status === true &&
                                    adminUsers.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            onClick={() =>
                                                setOpenEditModal({
                                                    status: true,
                                                    data: user,
                                                })
                                            }
                                        >
                                            <th
                                                scope="row"
                                                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={user.imageURL}
                                                    alt="Jese image"
                                                />
                                                <div className="pl-3">
                                                    <div className="text-base font-semibold">
                                                        {user.firstName}
                                                    </div>
                                                    <div className="text-base">
                                                        {user.lastName}
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {user.pwd}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.sexe}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.birthDate}
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

export default Users;
