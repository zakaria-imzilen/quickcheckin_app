import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tickets: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addToCart: (state, { payload }) => {
            let numObjects = payload.quantityValueTicket;

            const tickets = [];
            for (let index = 0; index < numObjects; index++) {
                // generate rendom non-repeating characters
                let generateCharactersIdTichet = "";
                let numberCharacter = 15;
                let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                for (let i = 0; i < numberCharacter; i++) {
                    let randomIndex = Math.floor(
                        Math.random() * characters.length
                    );
                    let randomCharacter = characters.charAt(randomIndex);
                    // Remove the selected character from the character set
                    characters =
                        characters.slice(0, randomIndex) +
                        characters.slice(randomIndex + 1);
                    generateCharactersIdTichet += randomCharacter;
                }
                // puch info event to cart
                state.tickets.push({
                    id_ticket_category: generateCharactersIdTichet,
                    eventPackage: payload.eventPackage,
                    eventId: payload.eventId,
                    event: payload.event,
                    date: payload.date,
                });
            }
        },
        deleteEventOrder: (state, { payload }) => {
            state.tickets = state.tickets.filter(
                (ticket) => ticket.eventId !== payload
            );
        },
    },
});

export const { addToCart, deleteEventOrder } = cartSlice.actions;
export default cartSlice.reducer;
