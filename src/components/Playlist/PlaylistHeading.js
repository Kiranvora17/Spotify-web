import classes from "./PlaylistHeading.module.css";
import ColorThief from "colorthief";

const PlaylistHeading = (props) => {
  const setColor = (color) => {
    document.documentElement.style.cssText = `--background: rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  const colorHandler = () => {
    const image = document.getElementById("albumImage");
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(image, 8);
    setColor(palette[0]);
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
        <p className={classes.type}>Playlist</p>
        <p className={classes.titleName}>{props.playlist.name}</p>
        <p className={classes.description}>{props.playlist.description}</p>
        <p>
          <span>{props.playlist.owner.display_name}</span> .{" "}
          <span>{props.playlist.total_tracks} songs</span>
        </p>
      </div>
    </div>
  );
};

export default PlaylistHeading;
