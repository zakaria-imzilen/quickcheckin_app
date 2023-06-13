import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import CartContent from "../components/CartContent";
import { Link } from "react-router-dom";
import PaymentModal from "../components/Modals/PaymentModal";
import { toast } from "react-toastify";

const Checkout = () => {
    const cart = useSelector((state) => state.cart.prep_tickets);
    const user = useSelector((state) => state.user.loggedIn);

    // Payment Modal
    const [open, setOpen] = useState(false);

    const totalHT = useMemo(() => {
        let sum = 0;

        cart.forEach(
            (ticket) => (sum += ticket.eventDetails.unitPrice * ticket.qty)
        );

        return sum;
    }, [cart]);

    const totalTTC = useMemo(() => {
        return totalHT + (totalHT * 20) / 100;
    });

    const handleProcessToPay = () => {
        if (user.status && user.role === "user" && user.info !== null) {
            setOpen(true);
            return;
        }
        toast.warning("Login to proceed to the payment");
        return;
    };

    return (
        <div>
            <Navbar />
            <PaymentModal open={open} setOpen={setOpen} />
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-12 lg:py-24">
                    <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white uppercase">
                        Checkout
                    </h1>
                </div>

                {cart.length === 0 ? (
                    <div className="max-w-2xl mx-auto">
                        <div
                            id="alert-border-1"
                            className="w-full flex p-4 my-14 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800"
                            role="alert"
                        >
                            <svg
                                className="flex-shrink-0 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <div className="ml-3 text-sm font-medium">
                                Empty basket
                            </div>
                        </div>
                        <div className="text-right">
                            <Link to={"/"}>
                                <button className="px-5 py-2 rounded-md bg-blue-300 text-slate-600 hover:scale-95 transition-all shadow-lg uppercase">
                                    Browse Events
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto my-32 max-w-screen-xl">
                        <div className="flex w-full gap-6">
                            <div className="cart w-3/4">
                                <h3 className="text-xl uppercase font-thin">
                                    Tickets added to the cart 🛒
                                </h3>
                                <CartContent />
                            </div>

                            {/* Summary Card */}
                            <div className="w-1/4 py-8 px-6 summary flex flex-col gap-y-5 bg-slate-100 shadow-lg text-slate-700 rounded-sm">
                                <h2 className="uppercase font-black text-2xl">
                                    Summary
                                </h2>
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>{totalHT} MAD</p>
                                </div>
                                <div className="my-4 flex justify-between">
                                    <p className="font-bold uppercase">
                                        Total (TVA: 20%)
                                    </p>
                                    <p className="font-bold uppercase">
                                        {totalTTC} MAD
                                    </p>
                                </div>

                                <button
                                    className="w-full rounded-sm py-4 uppercase font-light bg-slate-200 text-slate-700 hover:bg-blue-400 transition-all"
                                    onClick={() => handleProcessToPay()}
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Checkout;
