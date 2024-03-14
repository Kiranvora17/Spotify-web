import ColorThief from "colorthief";
import { useSelector } from "react-redux";
import classes from "./ProfileHeading.module.css";

const ProfileHeading = () => {
  const me = useSelector((state) => state.profile.me);
  console.log(me);

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
        src={me.imageBig}
        crossOrigin="anonymous"
      ></img>
      <div className={classes.title}>
        <p className={classes.titleName}>{me.name}</p>
      </div>
    </div>
  );
};

export default ProfileHeading;
