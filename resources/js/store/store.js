import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventSlice";
import cartSlice from "./shopping-cart/cartSlice";
import paymentSlice from "./paymentSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        event: eventSlice,
        payment: paymentSlice,
        user: userSlice,
    },
});

export default store;
