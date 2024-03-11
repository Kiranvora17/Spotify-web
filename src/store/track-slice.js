import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  track: {},
  trackArtist: {},
  recommend: {},
  topTracks: {},
  single: {},
  album: {},
};

const trackSlice = createSlice({
  name: "track",
  initialState: initialState,
  reducers: {
    setTrack(state, action) {
      state.track = action.payload.track;
    },
    setTrackArtist(state, action) {
      state.trackArtist.items = action.payload.artist;
    },
    setRecommend(state, action) {
      state.recommend.items = action.payload.playlist;
    },
    setTopTracks(state, action) {
      state.topTracks.items = action.payload.playlist;
    },
    setSingle(state, action) {
      state.single.items = action.payload.playlist;
    },
    setAlbum(state, action) {
      state.album.items = action.payload.playlist;
    },
  },
});

export const trackActions = trackSlice.actions;
export default trackSlice;
