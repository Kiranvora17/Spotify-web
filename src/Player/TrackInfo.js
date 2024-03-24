import { usePlaybackState } from "react-spotify-web-playback-sdk";
import classes from "./TrackInfo.module.css";

const TrackInfo = () => {
  const player = usePlaybackState();

  if (!player) return null;
  const track = player?.track_window?.current_track;

  if (track) {
    document.getElementById(
      "overlay"
    ).style.backgroundImage = `url(${track?.album.images[0].url})`;

    return (
      <div className={classes.container}>
        <img
          className={classes.trackImage}
          src={track?.album.images[0].url}
        ></img>
        <div className={classes.track}>
          <div className={classes.name}>
            {track?.name.length > 35
              ? track?.name.slice(0, 35) + " ..."
              : track?.name}
          </div>
          <div className={classes.artist}>
            {/* {track?.artists[0].name} */}
            {track?.artists.map((artist, index, array) => {
              if (index <= 2) {
                return (
                  <span key={artist.name}>
                    <span>{artist.name}</span>
                    <span>
                      {index <= 1 && index !== array.length - 1 ? ", " : null}
                    </span>
                  </span>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default TrackInfo;
