import {
  usePlaybackState,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import classes from "./Slider.module.css";

const Slider = (props) => {
  const player = useSpotifyPlayer();
  const track = usePlaybackState();

  const seekHandler = (e) => {
    const width = e.clientX - e.target.getBoundingClientRect().left;
    const totalWidth = document.getElementById("slider").offsetWidth;
    const percentage = Math.floor((width * 100) / totalWidth);

    player.seek((percentage * track.duration) / 100);
  };

  return (
    <div>
      <div id="slider" onClick={seekHandler} className={classes.slideBar}>
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

export default Slider;
