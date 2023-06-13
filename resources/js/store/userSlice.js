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

export const fetchMyTickets = createAsyncThunk(
    "us/fetch/tickets",
    async (id) => {
        const result = await fetch("/api/tickets/user/" + id);

        return result.json();
    }
);

export const fetchMyStats = createAsyncThunk("us/fetch/stats", async (id) => {
    const result = await fetch("/api/stats/nbrtickets/" + id);

    return result.json();
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: {
            status: false,
            info: null,
            role: "guest",
            message: null,
        },
        signUp: {
            status: null,
            error: null,
        },
        myTickets: {
            data: null,
            status: null,
        },
        stats: {
            status: null,
            data: null,
        },
    },
    reducers: {
        logMeOut: (state) => {
            state.loggedIn = {
                status: false,
                info: null,
                role: "guest",
            };

            state.myTickets = {
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
                state.loggedIn.role = "user";
            } else {
                state.loggedIn.info = null;
                state.loggedIn.role = "guest";
                state.loggedIn.message = payload.message;
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

        // Tickets
        builder.addCase(fetchMyTickets.fulfilled, (state, { payload }) => {
            state.myTickets.data = payload;
            state.myTickets.status = true;
        });
        builder.addCase(fetchMyTickets.rejected, (state) => {
            state.myTickets.data = [];
            state.myTickets.status = false;
        });
        builder.addCase(fetchMyTickets.pending, (state) => {
            state.myTickets.data = [];
            state.myTickets.status = "pending";
        });

        // Stats
        builder.addCase(fetchMyStats.fulfilled, (state, { payload }) => {
            state.stats.data = payload;
            state.stats.status = true;
        });
        builder.addCase(fetchMyStats.pending, (state) => {
            state.stats.status = "pending";
        });
        builder.addCase(fetchMyStats.rejected, (state) => {
            state.stats.data = [];
            state.stats.status = false;
        });
    },
});

export default userSlice.reducer;
export const { logMeOut } = userSlice.actions;
