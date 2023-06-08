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

export const logMeIn = createAsyncThunk("us/login", async ({ data, token }) => {
    const result = await fetch("/us/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "X-CSRF-TOKEN": token.content,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return result.json();
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: {
            status: null,
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
        // SIGN UP
        builder.addCase(signMeUp.fulfilled, (state, { payload }) => {
            state.signUp.status = true;
            state.signUp.error = null;
            state.loggedIn.status = true;
            state.loggedIn.info = payload.info;
        });
        builder.addCase(signMeUp.pending, (state) => {
            state.signUp.status = "pending";
            state.signUp.error = null;
        });
        builder.addCase(signMeUp.rejected, (state, { error }) => {
            state.signUp.status = false;
            state.signUp.error = error;
            state.loggedIn.status = false;
            state.loggedIn.info = null;
        });
        // <-- SIGN UP

        // LOGIN
        builder.addCase(logMeIn.fulfilled, (state, { payload }) => {
            state.loggedIn.status = payload.found;
            if (payload.found === true) {
                state.loggedIn.info = payload.info;
            } else {
                state.loggedIn.info = null;
            }
        });
        builder.addCase(logMeIn.pending, (state) => {
            state.loggedIn.status = "pending";
        });
        builder.addCase(logMeIn.rejected, (state) => {
            state.loggedIn.status = false;
            state.loggedIn.info = null;
        });
        // <-- LOGIN
    },
});

export default userSlice.reducer;
export const { logMeOut } = userSlice.actions;
