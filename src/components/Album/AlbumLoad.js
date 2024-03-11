import { useSelector } from "react-redux";
import FeedItemsList from "../Feed/FeedItemsList";

import classes from "./AlbumLoad.module.css";

const AlbumLoad = () => {
  const playlist = useSelector((state) => state.album.recommendAlbum);

  return (
    <div className={classes.loadcontainer}>
      <FeedItemsList playlist={playlist.items} />
    </div>
  );
};

export default AlbumLoad;
