import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchEvents = createAsyncThunk("events/fetch", async () => {
    const response = await fetch("/events");
    const data = await response.json();

    return data;
});

export const fetchCategories = createAsyncThunk(
    "events/categories/fetch",
    async () => {
        const response = await fetch("/events/categories");
        const data = await response.json();

        return data;
    }
);

export const fetchCategoryEvents = createAsyncThunk(
    "/events/category/fetch",
    async (id) => {
        const response = await fetch(`/events/categories/${id}`);
        const data = await response.json();

        return data;
    }
);

export const displayEventDetails = createAsyncThunk(
    "/event/fetch",
    async (id) => {
        const response = await fetch(`/event/${id}`);
        const data = await response.json();

        return data;
    }
);

const eventSlice = createSlice({
    name: "event",
    initialState: {
        data: [],
        categories: [],
        currentCategoryEvents: [],
        currentEvent: {},
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
            state.data = payload;
        });
        builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
            state.categories = payload;
        });
        builder.addCase(fetchCategoryEvents.fulfilled, (state, { payload }) => {
            state.currentCategoryEvents = payload;
        });
        builder.addCase(displayEventDetails.fulfilled, (state, { payload }) => {
            state.currentEvent = payload;
        });
    },
});

export default eventSlice.reducer;
