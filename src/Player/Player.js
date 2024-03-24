import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import classes from "./Player.module.css";
import PlayerTrack from "./PLayerTrack";
import TrackInfo from "./TrackInfo";
import PlayerOptions from "./PlayerOptions";

const Player = () => {
  const device = usePlayerDevice();

  return (
    <div className={classes.playerContainer}>
      {device?.status === "ready" && <TrackInfo />}
      {device?.status === "ready" && <PlayerTrack />}
      {device?.status === "ready" && <PlayerOptions />}
    </div>
  );
};

export default Player;
