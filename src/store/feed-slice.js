import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoaded: false,
  lastVisited: "/",
  recentlyPlayed: {},
  featuredPlaylist: {},
  newReleases: {},
  topHits: {},
  viralIndia: {},
  topArtists: {},
  feedAll: {},
  library: {},
};

const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {
    setIsLoaded(state) {
      state.isLoaded = !state.isLoaded;
    },
    setLastVisited(state, action) {
      state.lastVisited = action.payload;
    },
    setRecentlyplayed(state, action) {
      state.recentlyPlayed.items = action.payload.playlist;
      state.recentlyPlayed.itemsTrim = action.payload.playlistTrim;
      state.recentlyPlayed.message = "Recently Played";
    },
    setNewReleases(state, action) {
      state.newReleases.items = action.payload.playlist;
      state.newReleases.itemsTrim = action.payload.playlistTrim;
      state.newReleases.message = "New Releases";
    },
    setFeaturedPlayList(state, action) {
      state.featuredPlaylist.items = action.payload.playlist;
      state.featuredPlaylist.itemsTrim = action.payload.playlistTrim;
      state.featuredPlaylist.message = "Featured Playlists";
    },
    setTopHits(state, action) {
      state.topHits.items = action.payload.playlist;
      state.topHits.itemsTrim = action.payload.playlistTrim;
      state.topHits.message = "Top Hits";
    },
    setViralIndia(state, action) {
      state.viralIndia.items = action.payload.playlist;
      state.viralIndia.itemsTrim = action.payload.playlistTrim;
      state.viralIndia.message = "Viral India";
    },
    setTopArtists(state, action) {
      state.topArtists.items = action.payload.playlist;
      state.topArtists.itemsTrim = action.payload.playlistTrim;
      state.topArtists.message = "Your Top Artists";
    },
    setFeedAll(state, action) {
      state.feedAll.type = action.payload.type;
      state.feedAll.items = action.payload.playlist;
      state.feedAll.message = action.payload.message;
    },
    setLibrary(state, action) {
      state.library.items = action.payload.playlist;
    },
  },
});

export const feedActions = feedSlice.actions;
export default feedSlice;
