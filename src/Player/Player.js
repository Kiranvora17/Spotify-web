import classes from "./Player.module.css";
import { memo } from "react";
import usePLayerDevices from "../Hooks/PlayerDevice";
import TrackInfo from "./TrackInfo";
import PlayerTrack from "./PLayerTrack";
import PlayerOptions from "./PlayerOptions";
import { usePlaybackState} from "react-spotify-web-playback-sdk";

const Player = () => {
  const loading = usePLayerDevices();
  const player = usePlaybackState();

  return (
    <div className={classes.playerContainer}>
      {!loading && player?.track_window.current_track &&  (
        <div className={classes.animate}>
          <TrackInfo />
          <PlayerTrack />
          <PlayerOptions />
        </div>
      )}
    </div>
  );
};

export default memo(Player);
