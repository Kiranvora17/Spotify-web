import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlist: {},
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialState,
  reducers: {
    setPlaylist(state, action) {
      state.playlist.items = action.payload.items;
      state.playlist.description = action.payload.description;
      state.playlist.id = action.payload.id;
      state.playlist.image = action.payload.image;
      state.playlist.name = action.payload.name;
      state.playlist.owner = action.payload.owner;
      state.playlist.type = action.payload.type;
      state.playlist.total_tracks = action.payload.total_tracks;
    },
  },
});

export const playlistActions = playlistSlice.actions;
export default playlistSlice;
