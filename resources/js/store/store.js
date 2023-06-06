import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventSlice";
import cartSlice from "./shopping-cart/cartSlice";
import paymentSlice from "./paymentSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        event: eventSlice,
        payment: paymentSlice,
    },
});

export default store;
