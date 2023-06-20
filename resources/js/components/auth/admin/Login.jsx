import React, { useEffect, useState } from "react";
import LogoWhite from "../../../assets/QuickCheckin_white.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logMeInSA } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", pwd: "" });
    const loggedInResponse = useSelector((state) => state.user.loggedIn);

    const handleLogin = () => {
        const emailRGX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        // Validation
        if (form.pwd.length < 8) {
            // --> Alert
            toast.error("Invalid password");
            return;
        }
        if (!emailRGX.test(form.email)) {
            // --> Alert
            toast.error("Invalid email");
            return;
        }

        // --> Request
        const token = document.head.querySelector('meta[name="csrf-token"]');
        dispatch(logMeInSA({ token, data: form }));
    };

    useEffect(() => {
        if (loggedInResponse.status === true) {
            toast.success("Logged in successfuly.");

            navigate("/");
        } else if (loggedInResponse.status === false) {
            toast.error(loggedInResponse.message);
        }
    }, [loggedInResponse]);

    return (
        <div className="flex items-center justify-center text-center bg-gray-900 h-screen text-gray-100">
            <form
                novalidate=""
                action=""
                className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg text-gray-100 ng-untouched ng-pristine ng-valid"
            >
                <img
                    src={LogoWhite}
                    alt="Logo"
                    className="mb-8 w-full h-40 object-cover"
                />

                <label for="email" className="self-start text-xs font-semibold">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
                    value={form.email}
                    onChange={({ target }) =>
                        setForm((prev) => ({ ...prev, email: target.value }))
                    }
                />
                <label
                    for="password"
                    className="self-start mt-3 text-xs font-semibold"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
                    value={form.pwd}
                    onChange={({ target }) =>
                        setForm((prev) => ({ ...prev, pwd: target.value }))
                    }
                />
                <button
                    onClick={() => handleLogin()}
                    type="button"
                    className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded bg-violet-400 text-gray-900"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
