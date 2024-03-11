import classes from "./ArtistHeading.module.css";
import verified from "../../images/verified.png";

import ColorThief from "colorthief";

const ArtistHeading = (props) => {
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
        className={classes.headingimg}
        onLoad={colorHandler}
        id="albumImage"
        src={props.artist.image}
        crossOrigin="anonymous"
      ></img>
      <div className={classes.title}>
        <p className={classes.type}>
          <span>
            <img className={classes.verified} src={verified}></img>
          </span>
          Verified Artist
        </p>
        <p className={classes.titleName}>{props.artist.name}</p>
        <p className={classes.followers}>{props.artist.followers} Followers</p>
      </div>
    </div>
  );
};

export default ArtistHeading;
