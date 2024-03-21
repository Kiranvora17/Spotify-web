import { useSelector } from "react-redux";
import classes from "./LikeTracks.module.css";
import TracksList from "../pageComponents/TracksList";

const LikeTracks = () => {
  const playlist = useSelector((state) => state.like.tracks);

  if (playlist.items.length > 0) {
    return (
      <div className={classes.itemContainer}>
        <div className={classes.heading}>
          <p>Liked songs</p>
        </div>
        <TracksList playlist={playlist} />
      </div>
    );
  }
};

export default LikeTracks;
