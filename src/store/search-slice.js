import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  album: {},
  tracks: {},
  playlist: {},
  artist: {},
};

const searchslice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setAlbum(state, action) {
      state.album.itemsTrim = action.payload.playlist;
      state.album.message = "Albums";
    },
    setPlaylist(state, action) {
      state.playlist.itemsTrim = action.payload.playlist;
      state.playlist.message = "Playlist";
    },
    setArtist(state, action) {
      state.artist.itemsTrim = action.payload.playlist;
      state.artist.message = "Artists";
    },
    setTracks(state, action) {
      state.tracks.items = action.payload.playlist;
    },
  },
});

export const searchActions = searchslice.actions;
export default searchslice;
