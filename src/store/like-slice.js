import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tracks: {},
  playlist: {},
  album: {},
};

const likeSlice = createSlice({
  name: "like",
  initialState: initialState,
  reducers: {
    setTracks(state, action) {
      state.tracks.items = action.payload.playlist;
    },
    setAlbum(state, action) {
      state.album.items = action.payload.playlist;
    },
    setPlaylist(state, action) {
      state.playlist.items = action.payload.playlist;
    },
  },
});

export const likeActions = likeSlice.actions;
export default likeSlice;
