    import { createSlice } from "@reduxjs/toolkit";

    const QueueSlice = createSlice({
        name: 'queue',
        initialState: {
            current: {},
            next: {},
        },
        reducers: {
            setCurrent(state, action) {
                state.current.items = action.payload.current;
            },
            setItems(state, action) {
                state.next.items = action.payload.playlist;
            }
        }
    });

    export const queueActions = QueueSlice.actions;
    export default QueueSlice;