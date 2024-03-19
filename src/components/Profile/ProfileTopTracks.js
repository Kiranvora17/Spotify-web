import { useSelector } from "react-redux";
import classes from "./ProfileTopTracks.module.css";
import TracksList from "../pageComponents/TracksList";

const ProfileTopTracks = () => {
  const playlist = useSelector((state) => state.profile.tracks);

  return (
    <div className={classes.itemContainer}>
      <div className={classes.heading}>
        <p>Top tracks this Month</p>
        <p className={classes.info}>only visible to you</p>
      </div>
      <TracksList playlist={playlist} />
    </div>
  );
};

export default ProfileTopTracks;
