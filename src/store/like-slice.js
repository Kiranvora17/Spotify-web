import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tracks: {},
  tracksIds: [],
  playlist: {},
  album: {},
  ids: [],
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
    setPlaylist(state, action) {
      state.playlist.items = action.payload.playlist;
      state.playlist.itemsTrim = action.payload.playlistTrim;
      state.playlist.message = "Followed Playlists";
      state.playlist.type = "playlist";
    },
    setIds(state, action) {
      state.ids = [...state.ids, ...action.payload.ids];
    },
    removeids(state, action) {
      state.ids = state.ids.filter((id) => id !== action.payload.id);
    },
    addids(state, action) {
      state.ids = [...state.ids, action.payload.id];
    },
    addTrackids(state, action) {
      state.tracksIds = [...state.tracksIds, action.payload.id];
    },
    removeTrackids(state, action) {
      state.tracksIds = state.tracksIds.filter(
        (id) => id !== action.payload.id
      );
    },
    addTracks(state, action) {
      state.tracks.items = [action.payload.track, ...state.tracks.items];
    },
    removeTracks(state, action) {
      state.tracks.items = state.tracks.items.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const likeActions = likeSlice.actions;
export default likeSlice;
