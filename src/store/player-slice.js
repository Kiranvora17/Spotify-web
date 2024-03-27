import { createSlice } from "@reduxjs/toolkit";

const PlayerSlice = createSlice({
  name: "player",
  initialState: {
    activeDevice: "",
  },
  reducers: {
    setActivedevice(state, action) {
      state.activeDevice = action.payload.id;
    },
  },
});

export const PlayerAction = PlayerSlice.actions;
export default PlayerSlice;
