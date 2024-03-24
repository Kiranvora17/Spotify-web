import {
  usePlaybackState,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";

import classes from "./PlayerTrack.module.css";

import play from "../../src/images/play-player.png";
import pause from "../../src/images/pause-player.png";
import next from "../images/next-player.png";
import previous from "../images/previous-player.png";
import Slider from "./Slider";

const findDuration = (duration) => {
  let str = "";
  const first = Math.floor(duration / 60000);
  str += `${first}:`;
  const remainer = duration % 60000;
  const second = Math.floor(remainer / 1000);
  if (second < 10) {
    str += `0${second}`;
  } else {
    str += second;
  }

  return str;
};

const PlayerTrack = () => {
  const player = usePlaybackState({ interval: true });
  const track = useSpotifyPlayer();
  if (!player) return null;

  if (!player?.paused) {
    document.getElementById("title").textContent =
      player?.track_window.current_track.name;
  } else {
    document.getElementById("title").textContent =
      "Spotify - music for everyone";
  }

  const toggleHandler = () => {
    track.togglePlay();
  };

  const nextHandler = () => {
    track.nextTrack();
  };

  const previousHandler = () => {
    track.previousTrack();
  };

  return (
    <div className={classes.container}>
      <div className={classes.slider}>
        <div className={classes.time}>{findDuration(player?.position)}</div>
        <div>
          <Slider position={player?.position} duration={player?.duration} />
        </div>
        <div className={classes.time}>{findDuration(player?.duration)}</div>
      </div>
      <div className={classes.btn}>
        <img
          onClick={previousHandler}
          className={classes.navBtn}
          src={previous}
        ></img>
        <img
          onClick={toggleHandler}
          className={classes.play}
          src={player?.paused ? play : pause}
        ></img>
        <img onClick={nextHandler} className={classes.navBtn} src={next}></img>
      </div>
    </div>
  );
};

export default PlayerTrack;
