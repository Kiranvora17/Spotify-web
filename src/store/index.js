import { configureStore } from "@reduxjs/toolkit";
import albumSlice from "./album-slice";
import feedSlice from "./feed-slice";
import playlistSlice from "./playList-slice";
import artistSlice from "./artist-slice";
import trackSlice from "./track-slice";
import likeSlice from "./like-slice";
import profileSlice from "./profile-slice";
import searchslice from "./search-slice";

const store = configureStore({
  reducer: {
    feed: feedSlice.reducer,
    album: albumSlice.reducer,
    playlist: playlistSlice.reducer,
    artist: artistSlice.reducer,
    track: trackSlice.reducer,
    like: likeSlice.reducer,
    profile: profileSlice.reducer,
    search: searchslice.reducer,
  },
});

export default store;
