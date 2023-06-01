import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchEvents = createAsyncThunk("events/fetch", async (skip) => {
    const response = await fetch("/api/events/fetch/5");
    const data = await response.json();

    return data;
});

export const fetchCategories = createAsyncThunk(
    "events/categories/fetch",
    async () => {
        const response = await fetch("/api/events/categories/fetch");
        const data = await response.json();

        return data;
    }
);

export const fetchCategoryEvents = createAsyncThunk(
    "/events/category/fetch",
    async (id) => {
        const response = await fetch(`/api/events/categories/fetch/${id}`);
        const data = await response.json();

        return data;
    }
);

export const displayEventDetails = createAsyncThunk(
    "/event/fetch",
    async (slug) => {
        const response = await fetch(`/api/event/slug/${slug}`);
        const data = await response.json();

        return data;
    }
);

const eventSlice = createSlice({
    name: "event",
    initialState: {
        data: [],
        dataResponse: {
            status: null,
            error: null,
        },

        categories: [],
        categoriesResponse: {
            status: null,
            error: null,
        },

        currentCategoryEvents: [],
        currentCategoryEventsResponse: {
            status: null,
            error: null,
        },

        currentEvent: {},
        currentEventResponse: {
            status: null,
            error: null,
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.dataResponse.status = true;
            state.dataResponse.error = null;
        });
        builder.addCase(fetchEvents.pending, (state) => {
            state.data = [];
            state.dataResponse.status = "pending";
            state.dataResponse.error = null;
        });
        builder.addCase(fetchEvents.rejected, (state, { error }) => {
            state.data = [];
            state.dataResponse.status = false;
            state.dataResponse.error = error;
        });
        // ---
        builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
            state.categories = payload;
            state.categoriesResponse.status = true;
            state.categoriesResponse.error = null;
        });
        builder.addCase(fetchCategories.pending, (state) => {
            state.categories = [];
            state.categoriesResponse.status = "pending";
            state.categoriesResponse.error = null;
        });
        builder.addCase(fetchCategories.rejected, (state, { error }) => {
            state.categories = [];
            state.categoriesResponse.status = false;
            state.categoriesResponse.error = error;
        });
        // ---
        builder.addCase(fetchCategoryEvents.fulfilled, (state, { payload }) => {
            state.currentCategoryEvents = payload;
            state.currentCategoryEventsResponse.status = true;
            state.currentCategoryEventsResponse.error = null;
        });
        builder.addCase(fetchCategoryEvents.pending, (state) => {
            state.currentCategoryEvents = [];
            state.currentCategoryEventsResponse.status = "pending";
            state.currentCategoryEventsResponse.error = null;
        });
        builder.addCase(fetchCategoryEvents.rejected, (state, { error }) => {
            state.currentCategoryEvents = [];
            state.currentCategoryEventsResponse.status = false;
            state.currentCategoryEventsResponse.error = error;
        });
        // ---
        builder.addCase(displayEventDetails.fulfilled, (state, { payload }) => {
            state.currentEvent = payload;
            state.currentEventResponse.status = true;
            state.currentEventResponse.error = null;
        });
        builder.addCase(displayEventDetails.pending, (state) => {
            state.currentEvent = {};
            state.currentEventResponse.status = "pending";
            state.currentEventResponse.error = null;
        });
        builder.addCase(displayEventDetails.rejected, (state, { error }) => {
            state.currentEvent = {};
            state.currentEventResponse.status = false;
            state.currentEventResponse.error = error;
        });
    },
});

export default eventSlice.reducer;
