import classes from "./Player.module.css";
import { memo } from "react";
import usePLayerDevices from "../Hooks/PlayerDevice";
import TrackInfo from "./TrackInfo";
import PlayerTrack from "./PLayerTrack";
import PlayerOptions from "./PlayerOptions";

const Player = () => {
  const loading = usePLayerDevices();

  return (
    <div className={classes.playerContainer}>
      {!loading && (
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
