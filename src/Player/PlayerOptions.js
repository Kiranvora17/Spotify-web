import classes from "./PlayerOptions.module.css";

import lyrics from "../images/lyrics.png";
import queue from "../images/queue.png";
import devices from "../images/device.png";
import pip from "../images/pip.png";
import fullScreen from "../images/full-screen.png";

import lyricsActive from "../images/lyrics-active.png";
import queueActive from "../images/queue-active.png";
import devicesActiove from "../images/device-active.png";

const PlayerOptions = () => {
  return (
    <div className={classes.container}>
      <img src={lyrics}></img>
      <img src={queue}></img>
      <img src={devices}></img>
      <img src={pip}></img>
      <img src={fullScreen}></img>
    </div>
  );
};

export default PlayerOptions;
