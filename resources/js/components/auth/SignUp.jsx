import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../Navbar";

import LogoBlack from "../../assets/QuickCheckin-logos.jpeg";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signMeUp } from "../../store/userSlice";
import { useEffect } from "react";

const SignUp = () => {
    const [form, setForm] = useState({
        name: { first: "", last: "" },
        phone: "",
        birthDate: "",
        gender: "male",
        email: "",
        pwd: "",
        dbcheckPWD: "",
    });

    const dispatch = useDispatch();

    const signUpResponse = useSelector((state) => state.user.signUp);

    const handleSubmit = () => {
        // Validate inputs
        const rgxName = /[a-zA-Z]{1,10}/;
        const rgxNum =
            /^(?:(?:(?:\+|00)212[\s]?(?:[\s]?\(0\)[\s]?)?)|0){1}(?:5[\s.-]?[2-3]|6[\s.-]?[13-9]){1}[0-9]{1}(?:[\s.-]?\d{2}){3}$/gm;
        const dateEntered = new Date(form.birthDate);
        const rgxEmail =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const rgxPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

        if (!rgxName.test(form.name.first)) {
            toast.error("Invalid First Name");
            return;
        }

        if (!rgxName.test(form.name.last)) {
            toast.error("Invalid Last Name");
            return;
        }

        if (!rgxNum.test(form.phone)) {
            toast.error("Invalid Phone Number");
            return;
        }

        const now = new Date();
        if (now.getFullYear() - dateEntered.getFullYear() < 18) {
            toast.error("Invalid Birth Date (at least 18 years old)");
            return;
        }

        if (!rgxEmail.test(form.email)) {
            toast.error("Invalid Email");
            return;
        }

        if (!rgxPwd.test(form.pwd)) {
            toast.error("Password is not that strong !");
            return;
        }

        if (form.pwd !== form.dbcheckPWD) {
            toast.error(
                "The second password entered doesn't correspond to the first one"
            );
            return;
        }

        // EVERYTHING IS GOOD TO GO 🚀🚀
        const token = document.head.querySelector('meta[name="csrf-token"]');
        dispatch(
            signMeUp({
                token,
                data: {
                    firstName: form.name.first,
                    lastName: form.name.last,
                    email: form.email,
                    pwd: form.pwd,
                    sexe: form.gender,
                    birthDate: form.birthDate,
                },
            })
        );
    };

    useEffect(() => {
        if (signUpResponse.status === true) {
            toast.success("Sign up successfuly");
        } else if (signUpResponse.status === true) {
            toast.error("Can't sign you up for some reason");
        }
    }, [signUpResponse]);

    return (
        <main id="signup">
            <Navbar />
            <div className="flex bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500 h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto w-36 h-10 object-cover rounded-s-md"
                        src={LogoBlack}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create a new account in a few seconds..
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        <div className="grid gap-6 mb-6 md:grid-cols-2 align-middle">
                            <div>
                                <label
                                    for="first_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    First name
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Andrew"
                                    value={form.name.first}
                                    onChange={({ target }) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            name: {
                                                ...prev.name,
                                                first: target.value,
                                            },
                                        }))
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    for="last_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Tate"
                                    value={form.name.last}
                                    onChange={({ target }) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            name: {
                                                ...prev.name,
                                                last: target.value,
                                            },
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    for="phone"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Phone number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="0661626364"
                                    value={form.phone}
                                    onChange={({ target }) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            phone: target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    for="phone"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Birth Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={form.birthDate}
                                    onChange={({ target }) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            birthDate: target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-center w-full gap-6">
                            <div className="flex items-center my-4">
                                <input
                                    id="default-radio-1"
                                    type="radio"
                                    value=""
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={form.gender === "male"}
                                    onChange={() =>
                                        setForm((prev) => ({
                                            ...prev,
                                            gender: "male",
                                        }))
                                    }
                                />
                                <label
                                    for="default-radio-1"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Male
                                </label>
                            </div>
                            <div className="flex items-center my-6">
                                <input
                                    id="default-radio-2"
                                    type="radio"
                                    value=""
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={form.gender === "female"}
                                    onChange={() =>
                                        setForm((prev) => ({
                                            ...prev,
                                            gender: "female",
                                        }))
                                    }
                                />
                                <label
                                    for="default-radio-2"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Female
                                </label>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label
                                for="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="andrew@tate.com"
                                value={form.email}
                                onChange={({ target }) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        email: target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                for="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••"
                                value={form.pwd}
                                onChange={({ target }) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        pwd: target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                for="confirm_password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Confirm password
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••"
                                value={form.dbcheckPWD}
                                onChange={({ target }) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        dbcheckPWD: target.value,
                                    }))
                                }
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Submit
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Have an account already ?{" "}
                        <Link
                            to="/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default SignUp;
