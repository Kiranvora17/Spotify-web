import { useSelector } from "react-redux";

import classes from "./TopTracks.module.css";
import TracksList from "../pageComponents/TracksList";

const Toptracks = () => {
  const playlist = useSelector((state) => state.track.topTracks);
  const track = useSelector((state) => state.track.track);

  if (playlist.items.length > 0) {
    return (
      <div className={classes.itemContainer}>
        <div className={classes.heading}>
          <p className={classes.info}>Popular tracks by</p>
          <p>{track.artists.name}</p>
        </div>
        <TracksList playlist={playlist} />
      </div>
    );
  }
};

export default Toptracks;
