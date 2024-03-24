import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: {},
};

const CurrentlyPlayingSlice = createSlice({
  name: "currently playing",
  initialState: initialState,
  reducers: {
    setCurrent(state, action) {},
  },
});

export const currentActions = CurrentlyPlayingSlice.actions;
export default CurrentlyPlayingSlice;
