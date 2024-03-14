import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  me: {},
  artists: {},
  tracks: {},
  following: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setMe(state, action) {
      state.me.name = action.payload.display_name;
      state.me.image = action.payload.images[0].url;
      state.me.imageBig = action.payload.images[1].url;
    },
    setArtists(state, action) {
      state.artists.items = action.payload.playlist;
      state.artists.itemsTrim = action.payload.playlistTrim;
      state.artists.message = "Top Artists This Month";
    },
    setTracks(state, action) {
      state.tracks.items = action.payload.playlist;
    },
    setFollowing(state, action) {
      state.following.items = action.payload.playlist;
      state.following.itemsTrim = action.payload.playlistTrim;
      state.following.message = "Following";
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice;
