import { usePlaybackState } from "react-spotify-web-playback-sdk";
import classes from "./PlayerItem.module.css";
import TrackInfo from "./TrackInfo";
import PlayerTrack from "./PLayerTrack";
import PlayerOptions from "./PlayerOptions";

const PlayerItem = () => {
  const player = usePlaybackState();

  if (player?.track_window.current_track.id) {
    return (
      <div className={classes.animate}>
        <TrackInfo />
        <PlayerTrack />
        <PlayerOptions />
      </div>
    );
  }
};

export default PlayerItem;
