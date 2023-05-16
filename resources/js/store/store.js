import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventSlice";
import cartSlice from "./shopping-cart/cartSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        event: eventSlice,
    },
});

export default store;
