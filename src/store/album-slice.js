import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  albumPlaylist: {},
  recommendAlbum: {},
};

const albumSlice = createSlice({
  name: "album",
  initialState: initialState,
  reducers: {
    setAlbumPlaylist(state, action) {
      state.albumPlaylist.artists = action.payload.artists;
      state.albumPlaylist.items = action.payload.playlist;
      state.albumPlaylist.release_date = action.payload.release_date;
      state.albumPlaylist.image = action.payload.image;
      state.albumPlaylist.name = action.payload.name;
      state.albumPlaylist.total_tracks = action.payload.total_tracks;
      state.albumPlaylist.type = action.payload.type;
      state.albumPlaylist.uri = action.payload.uri;
    },
    setRecommend(state, action) {
      state.recommendAlbum.items = action.payload.playlist;
    },
  },
});

export const albumActions = albumSlice.actions;
export default albumSlice;
