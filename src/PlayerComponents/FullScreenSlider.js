import {
  usePlaybackState,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";

import classes from "./FullScreenSlider.module.css";

const FullScreenSlider = (props) => {
  const player = useSpotifyPlayer();
  const track = usePlaybackState();

  const seekHandler = (e) => {
    const width = e.clientX - e.target.getBoundingClientRect().left;
    const totalWidth = document.getElementById("fullSlider").offsetWidth;
    const percentage = Math.floor((width * 100) / totalWidth);

    player.seek((percentage * track.duration) / 100);
  };

  return (
    <div>
      <div
        id="fullSlider"
        onClick={(e) => {
          e.stopPropagation();
          seekHandler(e);
        }}
        className={classes.slideBar}
      >
        <div
          style={{
            width: `${(props.position * 100) / props.duration}%`,
          }}
          className={classes.progressed}
        ></div>
      </div>
    </div>
  );
};

export default FullScreenSlider;
