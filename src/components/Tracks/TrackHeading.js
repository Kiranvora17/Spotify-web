import { useNavigate } from "react-router";
import classes from "./TrackHeading.module.css";
import ColorThief from "colorthief";

const TrackHeading = (props) => {
  const navigate = useNavigate();

  const navigateHandler = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  const setColor = (color) => {
    document.documentElement.style.cssText = `--background: rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  const colorHandler = () => {
    const image = document.getElementById("albumImage");
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(image, 8);
    setColor(palette[2]);
  };

  return (
    <div className={classes.heading}>
      <img
        onLoad={colorHandler}
        id="albumImage"
        src={props.playlist.image}
        crossOrigin="anonymous"
      ></img>
      <div className={classes.title}>
        <p>Song</p>
        <h2>{props.playlist.name}</h2>
        <p>
          <span
            onClick={() => {
              navigateHandler(
                props.playlist.artists.type,
                props.playlist.artists.id
              );
            }}
            className={classes.artist}
          >
            {props.playlist.artists.name}
          </span>{" "}
          .{" "}
          <span
            onClick={() => {
              navigateHandler(props.playlist.type, props.playlist.id);
            }}
            className={classes.artist}
          >
            {props.playlist.albumName}
          </span>{" "}
          . <span>{props.playlist.duration}</span>
        </p>
      </div>
    </div>
  );
};

export default TrackHeading;
