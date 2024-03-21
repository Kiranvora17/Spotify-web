import { useSelector } from "react-redux";
import FeedItems from "../components/Feed/FeedItems";
import TracksList from "../components/pageComponents/TracksList";
import classes from "./SearchPage.module.css";

const SearchPage = () => {
  const track = useSelector((state) => state.search.tracks);
  const artist = useSelector((state) => state.search.artist);
  const album = useSelector((state) => state.search.album);
  const playlist = useSelector((state) => state.search.playlist);

  return (
    <div className={classes.container}>
      {track.items.length > 0 && (
        <div className={classes.itemContainer}>
          <h3 className={classes.heading}>Popular Tracks</h3>
          <TracksList playlist={track} />
        </div>
      )}
      {artist.itemsTrim.length > 0 && (
        <FeedItems disabled={true} playlist={artist} />
      )}
      {album.itemsTrim.length > 0 && (
        <FeedItems disabled={true} playlist={album} />
      )}
      {playlist.itemsTrim.length > 0 && (
        <FeedItems disabled={true} playlist={playlist} />
      )}
    </div>
  );
};

export default SearchPage;
