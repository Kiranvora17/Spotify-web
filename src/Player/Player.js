import classes from "./Player.module.css";
import { memo } from "react";
import usePLayerDevices from "../Hooks/PlayerDevice";
import TrackInfo from "./TrackInfo";
import PlayerTrack from "./PLayerTrack";
import PlayerOptions from "./PlayerOptions";
import { usePlaybackState } from "react-spotify-web-playback-sdk";
import { useSelector } from "react-redux";

const Player = () => {
  const loading = usePLayerDevices();
  const player = usePlaybackState();
  const me = useSelector((state) => state.profile.me);

  return (
    <div className={classes.playerContainer}>
      {me.accountType === "premium" &&
        !loading &&
        player?.track_window.current_track && (
          <div className={classes.animate}>
            <TrackInfo />
            <PlayerTrack />
            <PlayerOptions />
          </div>
        )}
      {me.accountType !== "premium" && !loading && (
        <div className={classes.playerError}>
          <p>
            Make sure You have Spotify premium account to access the player
            feature
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(Player);
