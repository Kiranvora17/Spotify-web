import { useSelector } from "react-redux";

import classes from "./PopularTracks.module.css";
import TracksList from "../pageComponents/TracksList";

const PopularTracks = () => {
  const playlist = useSelector((state) => state.artist.popularTracks);

  if (Object.keys(playlist).length === 0) return null;
  else {
    return (
      <div className={classes.itemContainer}>
        <h3 className={classes.heading}>Popular Tracks</h3>
        <TracksList type={"artist"} playlist={playlist} />
      </div>
    );
  }
};

export default PopularTracks;
