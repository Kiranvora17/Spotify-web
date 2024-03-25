import classes from "./TrackList.module.css";
import { useSelector } from "react-redux";
import TracksList from "../pageComponents/TracksList";

const TrackList = () => {
  const playlist = useSelector((state) => state.track.recommend);

  if (Object.keys(playlist).length === 0) return null;
  else {
    return (
      <div className={classes.itemContainer}>
        <div className={classes.heading}>
          <h3>Recommended</h3>
          <p>based on this song</p>
        </div>
        <TracksList playlist={playlist} />
      </div>
    );
  }
};

export default TrackList;
