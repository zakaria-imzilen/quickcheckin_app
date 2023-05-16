import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchEvents = createAsyncThunk("events/fetch", async () => {
    const response = await fetch("/events");
    const data = await response.json();

    return data;
});

const eventSlice = createSlice({
    name: "event",
    initialState: {
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
            state.data = payload;
        });
    },
});

export default eventSlice.reducer;
