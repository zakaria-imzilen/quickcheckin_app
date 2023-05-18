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

const eventSlice = createSlice({
    name: "event",
    initialState: {
        data: [],
        categories: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
            state.data = payload;
        });
        builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
            state.categories = payload;
        });
    },
});

export default eventSlice.reducer;
