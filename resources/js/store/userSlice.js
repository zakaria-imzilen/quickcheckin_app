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

export const fetchSAStats = createAsyncThunk("/sa/fetch/stats", async () => {
    const result = await fetch("/api/sa/stats");

    return result.json();
});

export const fetchSATickets = createAsyncThunk(
    "/sa/fetch/tickets",
    async () => {
        const result = await fetch("/api/sa/tickets");

        return result.json();
    }
);

export const fetchSAUsers = createAsyncThunk("/sa/fetch/users", async () => {
    const result = await fetch("/api/sa/users");

    return result.json();
});

export const fetchSAOrganizers = createAsyncThunk(
    "/sa/fetch/organizers",
    async () => {
        const result = await fetch("/api/sa/organizers");

        return result.json();
    }
);

export const fetchSAPayments = createAsyncThunk(
    "/sa/fetch/payments",
    async () => {
        const result = await fetch("/api/sa/payments");

        return result.json();
    }
);

export const editTicket = createAsyncThunk(
    "/sa/edit/tickets",
    async ({ token, id, data }) => {
        const result = await fetch("/api/sa/tickets/" + id, {
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

export const editUser = createAsyncThunk(
    "/sa/edit/users",
    async ({ token, id, data }) => {
        const result = await fetch("/api/sa/users/" + id, {
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

export const editOrganizer = createAsyncThunk(
    "/sa/edit/organizer",
    async ({ token, id, data }) => {
        const result = await fetch("/api/sa/organizers/" + id, {
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

export const logMeInSA = createAsyncThunk(
    "/sa/login",
    async ({ token, data }) => {
        const result = await fetch("/api/sa/auth/login", {
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
        adminStats: {
            status: null,
            data: null,
        },
        adminTickets: {
            status: null,
            data: null,
            edit: {
                status: null,
            },
        },
        adminUsers: {
            status: null,
            data: null,
            edit: {
                status: null,
            },
        },
        adminOrganizers: {
            status: null,
            data: null,
            edit: {
                status: null,
            },
        },
        adminPayments: {
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

        // Stats -- Us
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

        // Stats -- SA
        builder.addCase(fetchSAStats.fulfilled, (state, { payload }) => {
            state.adminStats.data = payload;
            state.adminStats.status = true;
        });
        builder.addCase(fetchSAStats.pending, (state, { payload }) => {
            state.adminStats.status = "pending";
        });
        builder.addCase(fetchSAStats.rejected, (state, { payload }) => {
            state.adminStats.data = [];
            state.adminStats.status = false;
        });

        // Tickets -- SA
        builder.addCase(fetchSATickets.fulfilled, (state, { payload }) => {
            state.adminTickets.data = payload;
            state.adminTickets.status = true;
        });
        builder.addCase(fetchSATickets.pending, (state) => {
            state.adminTickets.status = "pending";
        });
        builder.addCase(fetchSATickets.rejected, (state) => {
            state.adminTickets.data = [];
            state.adminTickets.status = false;
        });

        // Users -- SA
        builder.addCase(fetchSAUsers.fulfilled, (state, { payload }) => {
            state.adminUsers.data = payload;
            state.adminUsers.status = true;
        });
        builder.addCase(fetchSAUsers.pending, (state) => {
            state.adminUsers.status = "pending";
        });
        builder.addCase(fetchSAUsers.rejected, (state) => {
            state.adminUsers.data = [];
            state.adminUsers.status = false;
        });

        // Organizers -- SA
        builder.addCase(fetchSAOrganizers.fulfilled, (state, { payload }) => {
            state.adminOrganizers.data = payload;
            state.adminOrganizers.status = true;
        });
        builder.addCase(fetchSAOrganizers.pending, (state) => {
            state.adminOrganizers.status = "pending";
        });
        builder.addCase(fetchSAOrganizers.rejected, (state) => {
            state.adminOrganizers.data = [];
            state.adminOrganizers.status = false;
        });

        // Payments -- SA
        builder.addCase(fetchSAPayments.fulfilled, (state, { payload }) => {
            state.adminPayments.data = payload;
            state.adminPayments.status = true;
        });
        builder.addCase(fetchSAPayments.pending, (state) => {
            state.adminPayments.status = "pending";
        });
        builder.addCase(fetchSAPayments.rejected, (state) => {
            state.adminPayments.data = [];
            state.adminPayments.status = false;
        });

        // Tickets -- EDIT -- SA
        builder.addCase(editTicket.fulfilled, (state, { payload }) => {
            state.adminTickets.edit.status = payload.updated;
        });
        builder.addCase(editTicket.pending, (state) => {
            state.adminTickets.edit.status = "pending";
        });
        builder.addCase(editTicket.rejected, (state, { error }) => {
            state.adminTickets.edit.status = error;
        });

        // USERS -- EDIT -- SA
        builder.addCase(editUser.fulfilled, (state, { payload }) => {
            state.adminUsers.edit.status = payload.updated;
        });
        builder.addCase(editUser.pending, (state) => {
            state.adminUsers.edit.status = "pending";
        });
        builder.addCase(editUser.rejected, (state, { error }) => {
            state.adminUsers.edit.status = error;
        });

        // OGANIZERS -- EDIT -- SA
        builder.addCase(editOrganizer.fulfilled, (state, { payload }) => {
            state.adminOrganizers.edit.status = payload.updated;
        });
        builder.addCase(editOrganizer.pending, (state) => {
            state.adminOrganizers.edit.status = "pending";
        });
        builder.addCase(editOrganizer.rejected, (state, { error }) => {
            state.adminOrganizers.edit.status = error;
        });

        // SA -- LOGIN
        builder.addCase(logMeInSA.fulfilled, (state, { payload }) => {
            state.loggedIn.status = payload.found;
            if (payload.found === true) {
                state.loggedIn.info = payload.data;
                state.loggedIn.role = "superadmin";
            } else {
                state.loggedIn.info = null;
                state.loggedIn.role = "guest";
                state.loggedIn.message = payload.message;
            }
        });
        builder.addCase(logMeInSA.pending, (state) => {
            state.loggedIn.status = "pending";
        });
        builder.addCase(logMeInSA.rejected, (state) => {
            state.loggedIn.status = false;
            state.loggedIn.info = null;
        });
    },
});

export default userSlice.reducer;
export const { logMeOut } = userSlice.actions;
