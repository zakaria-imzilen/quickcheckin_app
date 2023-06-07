import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signMeUp = createAsyncThunk(
    "us/signup",
    async ({ data, token }) => {
        const result = await fetch("/us/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "X-CSRF-TOKEN": token.content,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return result.json();
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: {
            status: false,
            info: null,
        },
        signUp: {
            status: null,
            error: null,
        },
        myOrders: {
            data: null,
            status: null,
        },
    },
    reducers: {
        logMeOut: (state) => {
            state.loggedIn = {
                status: false,
                info: null,
            };

            state.myOrders = {
                data: null,
                status: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signMeUp.fulfilled, (state, { payload }) => {
            state.signUp.status = true;
            state.signUp.error = null;
            state.loggedIn.status = true;
            state.loggedIn.info = payload.info;
        });
        builder.addCase(signMeUp.rejected, (state, { error }) => {
            state.signUp.status = false;
            state.signUp.error = error;
            state.loggedIn.status = false;
            state.loggedIn.info = null;
        });
    },
});

export default userSlice.reducer;
export const { logMeOut } = userSlice.actions;
