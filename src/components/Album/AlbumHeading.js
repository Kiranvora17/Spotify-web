import classes from "./AlbumHeading.module.css";
import ColorThief from "colorthief";

const AlbumHeading = (props) => {
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
        <p>Album</p>
        <h2>{props.playlist.name}</h2>
        <p>
          <span>{props.playlist.artists.name}</span> .{" "}
          <span>{props.playlist.release_date}</span> .{" "}
          <span>
            {props.playlist.total_tracks > 50
              ? 50
              : props.playlist.total_tracks}{" "}
            songs
          </span>
        </p>
      </div>
    </div>
  );
};

export default AlbumHeading;
