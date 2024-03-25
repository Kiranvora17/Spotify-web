import { useSelector } from "react-redux";
import FeedItems from "./FeedItems";

import classes from "./Feed.module.css";

const Feed = () => {
  const recentlyPlayed = useSelector((state) => state.feed.recentlyPlayed);
  const newReleases = useSelector((state) => state.feed.newReleases);
  const featuredPlaylist = useSelector((state) => state.feed.featuredPlaylist);
  const topHits = useSelector((state) => state.feed.topHits);
  const viral = useSelector((state) => state.feed.viralIndia);
  const topArtists = useSelector((state) => state.feed.topArtists);

  if (Object.keys(recentlyPlayed).length === 0) return;
  else {
    return (
      <div className={classes.container}>
        <div className={classes.containeralign}>
          {recentlyPlayed.items.length > 0 && (
            <FeedItems playlist={recentlyPlayed} />
          )}
        </div>
        <div className={classes.containeralign}>
          <FeedItems playlist={featuredPlaylist} />
        </div>
        <FeedItems playlist={newReleases} />
        <FeedItems playlist={topHits} />
        <FeedItems playlist={viral} />
        <FeedItems playlist={topArtists} />
        <div className={classes.footer}>made with ❤️ by Kiran Vora</div>
      </div>
    );
  }
};

export default Feed;
