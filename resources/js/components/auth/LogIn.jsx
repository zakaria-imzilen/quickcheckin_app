import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import LogoBlack from "../../assets/QuickCheckin-logos.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logMeIn } from "../../store/userSlice";
import Loading from "../Loading";

const LogIn = () => {
    const [form, setForm] = useState({ email: "", pwd: "" });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedInResponse = useSelector((state) => state.user.loggedIn);

    const handleLogIn = () => {
        const rgxEmail =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const rgxPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

        if (!rgxEmail.test(form.email)) {
            toast.error("Invalid email");
            return;
        }
        if (!rgxPwd.test(form.pwd)) {
            toast.error("Invalid password");
            return;
        }

        const token = document.head.querySelector('meta[name="csrf-token"]');
        dispatch(logMeIn({ data: form, token }));
    };

    useEffect(() => {
        if (loggedInResponse.status === true) {
            toast.success(
                "Logged in successfuly, you will be redirected to your profile in a few seconds"
            );

            setTimeout(() => {
                navigate("/profile");
            }, 1500);
        } else if (loggedInResponse.status === false) {
            toast.error("Incorrect credentials");
        }
    }, [loggedInResponse]);

    return (
        <main id="signup">
            <Navbar />
            {loggedInResponse.status === "pending" ? <Loading /> : ""}

            <div className="flex bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500 h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto w-36 h-10 object-cover rounded-s-md"
                        src={LogoBlack}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={({ target }) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            email: target.value,
                                        }))
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={form.pwd}
                                    onChange={({ target }) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            pwd: target.value,
                                        }))
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleLogIn}
                                type="button"
                                className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Create a new account
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LogIn;
