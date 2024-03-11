import { useSelector } from "react-redux";
import FeedItems from "./FeedItems";

import classes from "./Feed.module.css";
import FeedArtist from "./FeedArtist";

const Feed = () => {
  const recentlyPlayed = useSelector((state) => state.feed.recentlyPlayed);
  const newReleases = useSelector((state) => state.feed.newReleases);
  const featuredPlaylist = useSelector((state) => state.feed.featuredPlaylist);
  const topHits = useSelector((state) => state.feed.topHits);
  const viral = useSelector((state) => state.feed.viralIndia);
  const topArtists = useSelector((state) => state.feed.topArtists);

  return (
    <div className={classes.container}>
      <FeedItems playlist={recentlyPlayed} />
      <FeedItems playlist={featuredPlaylist} />
      <FeedItems playlist={newReleases} />
      <FeedItems playlist={topHits} />
      <FeedItems playlist={viral} />
      <FeedArtist playlist={topArtists} />
      <div className={classes.footer}>made with ❤️ by Kiran Vora</div>
    </div>
  );
};

export default Feed;
