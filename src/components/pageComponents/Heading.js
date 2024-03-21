import ColorThief from "colorthief";
import classes from "./Heading.module.css";

import verified from "../../images/verified.png";
import liked from "../../images/likeHeading.png";
import HeadingFooter from "./HeadingFooter";

const Heading = (props) => {
  const setColor = (color) => {
    const heading = document.getElementById("heading");
    heading.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    heading.style.boxShadow = `0px 80px 600px rgb(${color[0]}, ${color[1]}, ${color[2]}),
     100px 100px 600px rgba(0, 0, 0, 0.55) inset`;
    document.documentElement.style.cssText = `--background: rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  const colorHandler = () => {
    const image = document.getElementById("albumImage");
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(image, 8);
    setColor(palette[2]);
  };

  return (
    <>
      <div id="heading" className={`${classes.heading} ${props.className}`}>
        <img
          onLoad={colorHandler}
          id="albumImage"
          className={classes.headingImg}
          src={props.playlist?.image ? props.playlist.image : liked}
          crossOrigin="anonymous"
        ></img>
        <div className={classes.title}>
          {props.playlist?.type === "artist" && (
            <p className={classes.type}>
              <span>
                <img className={classes.verified} src={verified}></img>
              </span>
              Verified Artist
            </p>
          )}
          {props.playlist?.type !== "like" &&
            props.playlist?.type !== "profile" &&
            props.playlist?.type !== "artist" && (
              <p className={classes.type}>{props.playlist?.type}</p>
            )}
          <div>
            <p className={classes.titleName}>
              {props.playlist?.name
                ? props.playlist.name.length > 24
                  ? props.playlist.name.slice(0, 24) + "..."
                  : props.playlist.name
                : "Liked"}
            </p>

            {props.playlist?.description &&
              !props.playlist?.description.startsWith("<") && (
                <p className={classes.description}>
                  {props.playlist?.description.length > 140
                    ? props.playlist.description.slice(0, 140) + " ..."
                    : props.playlist.description}
                </p>
              )}

            {props.playlist?.type === "album" && (
              <HeadingFooter
                items={[
                  props.playlist.artists.name,
                  props.playlist.release_date,
                  `${
                    props.playlist.total_tracks > 50
                      ? 50
                      : props.playlist.total_tracks
                  } Songs`,
                ]}
              />
            )}
            {props.playlist?.type === "playlist" && (
              <HeadingFooter
                items={[
                  props.playlist.owner.display_name,
                  `${props.playlist.total_tracks} Songs`,
                ]}
              />
            )}
            {props.playlist?.type === "artist" && (
              <HeadingFooter
                items={[`${props.playlist.followers} Followers`]}
              />
            )}
            {props.playlist?.type === "track" && (
              <HeadingFooter
                items={[
                  props.playlist.artists.name,
                  props.playlist.albumName.length > 40
                    ? props.playlist.albumName.slice(0, 40) + "... "
                    : props.playlist.albumName,
                  props.playlist.duration,
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Heading;
