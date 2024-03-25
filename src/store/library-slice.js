import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
  name: "library",
  initialState: {
    library: {},
  },
  reducers: {
    setLibrary(state, action) {
      state.library.items = action.payload.playlist;
    },
    removeItem(state, action) {
      state.library.items = state.library.items.filter(
        (item) => item.id !== action.payload.id
      );
    },
    addItem(state, action) {
      state.library.items = [action.payload.item, ...state.library.items];
    },
  },
});

export const libraryActions = librarySlice.actions;
export default librarySlice;
