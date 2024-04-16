import { useSelector } from "react-redux";
import FeedItems from "./FeedItems";

import classes from "./Feed.module.css";
import useFetch from "../../Hooks/FetchHook";
import {
  ArtistIdsActions,
  albumIdsActions,
  likeTrackActions,
  playlistIdsActions,
  trackIdsActions,
} from "../../store/LikeActions";

const Feed = () => {
  const recentlyPlayed = useSelector((state) => state.feed.recentlyPlayed);
  const newReleases = useSelector((state) => state.feed.newReleases);
  const featuredPlaylist = useSelector((state) => state.feed.featuredPlaylist);
  const topHits = useSelector((state) => state.feed.topHits);
  const viral = useSelector((state) => state.feed.viralIndia);
  const topArtists = useSelector((state) => state.feed.topArtists);

  const isLoaded = useFetch([
    {
      url: `https://api.spotify.com/v1/me/tracks?market=IN&limit=50`,
      saveData: likeTrackActions,
    },
    {
      url: `https://api.spotify.com/v1/me/tracks?market=IN&limit=50`,
      saveData: trackIdsActions,
    },
    {
      url: `https://api.spotify.com/v1/me/albums?limit=50&market=IN`,
      saveData: albumIdsActions,
    },
    {
      url: "https://api.spotify.com/v1/me/playlists",
      saveData: playlistIdsActions,
    },
    {
      url: "https://api.spotify.com/v1/me/following?type=artist&limit=50",
      saveData: ArtistIdsActions,
    },
  ]);

  if (Object.keys(recentlyPlayed).length === 0) return;
  else {
    return (
      <div className={classes.container}>
        {recentlyPlayed.items.length > 0 && (
          <FeedItems playlist={recentlyPlayed} />
        )}
        <FeedItems playlist={featuredPlaylist} />
        <FeedItems playlist={newReleases} />
        <FeedItems playlist={topHits} />
        <FeedItems playlist={viral} />
        <FeedItems playlist={topArtists} />
      </div>
    );
  }
};

export default Feed;
