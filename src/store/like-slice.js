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
      state.album.itemsTrim = action.payload.playlistTrim;
      state.album.message = "Followed Albums";
      state.album.type = "album";
    },
    setPlaylist(state, action) {
      state.playlist.items = action.payload.playlist;
      state.playlist.itemsTrim = action.payload.playlistTrim;
      state.playlist.message = "Followed Playlists";
      state.playlist.type = "playlist";
    },
  },
});

export const likeActions = likeSlice.actions;
export default likeSlice;
