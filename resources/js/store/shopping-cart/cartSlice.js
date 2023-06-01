import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prep_tickets: [],
    tickets: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addToCart: (state, { payload }) => {
            const eventExistsBefore = state.prep_tickets.filter(
                (tick) => tick.eventDetails.id === payload.event.id
            );

            const packExistsBefore = state.prep_tickets.filter(
                (tick) => tick.packageDetails.id === payload.package.id
            );

            if (
                eventExistsBefore.length === 0 ||
                packExistsBefore.length === 0
            ) {
                state.prep_tickets.push({
                    id: state.prep_tickets.length + 1,
                    eventDetails: payload.event,
                    packageDetails: payload.package,
                    qty: payload.quantityValueTicket,
                });
            } else {
                state.prep_tickets = [
                    ...state.prep_tickets.filter(
                        (tick) =>
                            tick.eventDetails.id !== payload.event.id &&
                            tick.packageDetails.id !== payload.eventPackage
                    ),
                    {
                        ...state.prep_tickets.filter(
                            (tick) =>
                                tick.eventDetails.id === payload.event.id &&
                                tick.packageDetails.id === payload.eventPackage
                        )[0],
                        qty:
                            state.prep_tickets.filter(
                                (tick) =>
                                    tick.eventDetails.id === payload.event.id &&
                                    tick.packageDetails.id ===
                                        payload.eventPackage
                            )[0].qty + payload.quantityValueTicket,
                    },
                ];
            }
        },
        checkout: (state, { payload }) => {
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

export const { checkout, deleteEventOrder, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
