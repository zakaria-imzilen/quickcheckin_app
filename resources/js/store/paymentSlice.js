import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const passPayment = createAsyncThunk(
    "payment/pass",
    async ({ tickets, payment, token }) => {
        const result = await fetch("/api/tickets/buy", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "X-CSRF-TOKEN": token.content,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets, payment }),
        });

        return result;
    }
);

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        status: null,
        message: null,
    },
    extraReducers: (build) => {
        build.addCase(passPayment.fulfilled, (state, { payload }) => {
            state.status = true;
            state.message = null;
        });
        build.addCase(passPayment.rejected, (state, { payload }) => {
            state.status = true;
        });
    },
});

export default paymentSlice.reducer;
