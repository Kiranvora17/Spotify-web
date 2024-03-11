import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Artist: {},
  popularTracks: {},
  popularRelease: {},
  single: {},
  compilation: {},
  related: {},
  appearsOn: {},
};

const artistSlice = createSlice({
  name: "artist",
  initialState: initialState,
  reducers: {
    setArtist(state, action) {
      state.Artist.items = action.payload.items;
    },
    setPopular(state, action) {
      state.popularTracks.items = action.payload.playlist;
    },
    setPopularRelease(state, action) {
      state.popularRelease.itemsTrim = action.payload.playlist;
      state.popularRelease.message = "Popular Releases";
    },
    setSingle(state, action) {
      state.single.itemsTrim = action.payload.playlist;
      state.single.message = "Singles";
    },
    setCompilation(state, action) {
      state.compilation.itemsTrim = action.payload.playlist;
      state.compilation.message = "Compilations";
    },
    setRelated(state, action) {
      state.related.itemsTrim = action.payload.playlist;
      state.related.message = "Fans also like";
    },
    setAppearsOn(state, action) {
      state.appearsOn.itemsTrim = action.payload.playlist;
      state.appearsOn.message = "Appears On";
    },
  },
});

export const artistActions = artistSlice.actions;
export default artistSlice;
