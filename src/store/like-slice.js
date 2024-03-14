import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tracks: {},
  tracksIds: [],
  playlist: {},
  playlistIds: [],
  album: {},
  albumIds: {},
};

const likeSlice = createSlice({
  name: "like",
  initialState: initialState,
  reducers: {
    setTracks(state, action) {
      state.tracks.items = action.payload.playlist;
    },
    setTracksIds(state, action) {
      state.tracksIds = action.payload.ids;
    },
    setAlbum(state, action) {
      state.album.items = action.payload.playlist;
      state.album.itemsTrim = action.payload.playlistTrim;
      state.album.message = "Followed Albums";
      state.album.type = "album";
    },
    setAlbumIds(state, action) {
      state.albumIds = action.payload.ids;
    },
    setPlaylist(state, action) {
      state.playlist.items = action.payload.playlist;
      state.playlist.itemsTrim = action.payload.playlistTrim;
      state.playlist.message = "Followed Playlists";
      state.playlist.type = "playlist";
    },
    setPlaylistIds(state, action) {
      state.playlistIds = action.payload.ids;
    },
  },
});

export const likeActions = likeSlice.actions;
export default likeSlice;
