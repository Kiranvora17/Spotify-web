import { configureStore } from "@reduxjs/toolkit";
import albumSlice from "./album-slice";
import feedSlice from "./feed-slice";
import playlistSlice from "./playList-slice";
import artistSlice from "./artist-slice";
import trackSlice from "./track-slice";
import likeSlice from "./like-slice";

const store = configureStore({
  reducer: {
    feed: feedSlice.reducer,
    album: albumSlice.reducer,
    playlist: playlistSlice.reducer,
    artist: artistSlice.reducer,
    track: trackSlice.reducer,
    like: likeSlice.reducer,
  },
});

export default store;
