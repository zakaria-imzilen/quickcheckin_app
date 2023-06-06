import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { isNumericString } from "../../utils/payment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { passPayment } from "../../store/paymentSlice";

const PaymentModal = ({ setOpen, open }) => {
    const dispatch = useDispatch();

    const prep_tickets = useSelector((state) => state.cart.prep_tickets);

    const [form, setForm] = useState({
        cardNumber: "",
        name: "",
        expiry: { month: "", year: "" },
        securityNum: "",
    });

    const cancelButtonRef = useRef(null);

    const handlePayment = () => {
        // Verify the inputs
        const rgxCreditCard = /^[0-9]{13,16}$/;
        const rgxFN = /^[A-Za-zÀ-ÿ'-\s]+$/;
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        const seconds = String(currentDate.getSeconds()).padStart(2, "0");

        const mysqlDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        if (!rgxCreditCard.test(form.cardNumber)) {
            toast.error("The credit card number entered is invalid");
            return;
        }

        if (!rgxFN.test(form.name)) {
            toast.error("Card holder name is invalid");
            return;
        }

        if (currentDate.getFullYear() > Number("20" + form.expiry.year)) {
            toast.error("Your card is expired");
            return;
        }
        console.log(currentDate.getMonth() + 1);
        console.log(Number(form.expiry.month));

        console.log(currentDate.getFullYear());
        console.log(Number(form.expiry.year));
        if (
            currentDate.getFullYear() == Number("20" + form.expiry.year) &&
            currentDate.getMonth() + 1 > Number(form.expiry.month)
        ) {
            toast.error("Your card is expired");
            return;
        }

        if (!/^\d{3}$/.test(form.securityNum)) {
            toast.error("Security Number entered is invalid");
            return;
        }

        // Send the API Request
        // Prepare API Req body (tickets + payment)
        const tickets = [];
        prep_tickets.forEach((ticket) => {
            // Duplicate ticket depending on the qty
            for (let i = 0; i < ticket.qty; i++) {
                // Append the tickets to tickets
                tickets.push({
                    date: mysqlDatetime,
                    packId: ticket.packageDetails.id,
                    eventId: ticket.eventDetails.id,
                    userId: 1, // @note TO CHANGE
                    status: "active",
                });
            }
        });
        const payment = {
            creditCardNum: form.cardNumber,
            expiringDate: form.expiry.month + "/" + form.expiry.year,
            holderFullName: form.name,
            securityNumber: form.securityNum,
            userId: 1, // @note TO CHANGE
        };
        // --> Response: Toast
        let token = document.head.querySelector('meta[name="csrf-token"]');
        dispatch(passPayment({ tickets, payment, token }));
        // --> --> True: Clear the basket
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-300 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="white"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-base font-semibold leading-6 text-gray-900"
                                            >
                                                Enter your credit card details
                                            </Dialog.Title>
                                            <div className="mt-2 flex flex-col gap-3">
                                                {/* Content */}
                                                <input
                                                    type="text"
                                                    className="border-2 rounded-lg text-xs border-gray-400"
                                                    placeholder="Card Number"
                                                    value={form.cardNumber}
                                                    onChange={({ target }) =>
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            cardNumber:
                                                                target.value,
                                                        }))
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    className="border-2 rounded-lg text-xs border-gray-400"
                                                    placeholder="Name on card"
                                                    value={form.name}
                                                    onChange={({ target }) => {
                                                        console.log(
                                                            target.value.match(
                                                                /[A-Za-z]/i
                                                            )
                                                        );
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            name:
                                                                // target.value.exec(
                                                                //     /[A-Za-z]{15}/
                                                                // ) !== null
                                                                //     ?
                                                                target.value,
                                                            // : prev.name,
                                                        }));
                                                    }}
                                                />
                                                <div className="flex gap-3">
                                                    <div class="exp-wrapper flex w-1/2">
                                                        <input
                                                            className="w-1/2 border-gray-400 rounded-lg text-xs border-2"
                                                            id="month"
                                                            maxLength="2"
                                                            pattern="[0-9]*"
                                                            inputMode="numerical"
                                                            placeholder="MM"
                                                            value={
                                                                form.expiry
                                                                    .month
                                                            }
                                                            onChange={({
                                                                target,
                                                            }) =>
                                                                setForm(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        expiry: {
                                                                            ...prev.expiry,
                                                                            month: target.value,
                                                                        },
                                                                    })
                                                                )
                                                            }
                                                            type="text"
                                                            data-pattern-validate
                                                        />
                                                        <input
                                                            className="w-1/2 border-gray-400 rounded-lg text-xs border-2"
                                                            id="year"
                                                            maxLength="2"
                                                            pattern="[0-9]*"
                                                            inputMode="numerical"
                                                            placeholder="YY"
                                                            value={
                                                                form.expiry.year
                                                            }
                                                            onChange={({
                                                                target,
                                                            }) =>
                                                                setForm(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        expiry: {
                                                                            ...prev.expiry,
                                                                            year: target.value,
                                                                        },
                                                                    })
                                                                )
                                                            }
                                                            type="text"
                                                            data-pattern-validate
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="security_code"
                                                        id="security_code"
                                                        placeholder="Security code"
                                                        value={form.securityNum}
                                                        onChange={({
                                                            target,
                                                        }) =>
                                                            isNumericString(
                                                                target.value
                                                            ) &&
                                                            /^\d{0,3}$/.test(
                                                                target.value
                                                            ) === true &&
                                                            setForm((prev) => ({
                                                                ...prev,
                                                                securityNum:
                                                                    target.value,
                                                            }))
                                                        }
                                                        className="border-2 rounded-lg text-xs border-gray-400 w-1/2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:justify-end sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-50 hover:text-black sm:mt-0 sm:w-auto transition-all"
                                        onClick={() => handlePayment()}
                                        ref={cancelButtonRef}
                                    >
                                        Pay Now
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition-all"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default PaymentModal;
