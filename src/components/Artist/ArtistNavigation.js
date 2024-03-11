import { useState, useEffect } from "react";

import liked from "../../images/liked.png";
import like from "../../images/like.png";
import classes from "./ArtistNavigation.module.css";

const ArtistNavigation = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const playUrl = "https://i.postimg.cc/W1Y1PWzS/icons8-play-50-1.png";
  const pauseUrl = "https://i.postimg.cc/tTmyQL7z/icons8-pause-button-50-1.png";

  useEffect(() => {
    const primary = document.getElementById("primary");
    const scrollWatcher = document.getElementById("scroll-data-watcher");

    const navObserver = new IntersectionObserver((entry) => {
      primary.classList.toggle(`${classes.sticky}`, !entry[0].isIntersecting);
    });

    navObserver.observe(scrollWatcher);
  }, []);

  const changeSrc = () => {
    setIsPlaying(!isPlaying);
  };

  const changeFollow = () => {
    setIsFollow(!isFollow);
  };

  return (
    <>
      <div id="scroll-data-watcher"></div>
      <div id="primary" className={classes.navbar}>
        <img
          onClick={changeSrc}
          className={classes.playpause}
          src={isPlaying ? pauseUrl : playUrl}
        ></img>
        <button onClick={changeFollow} className={classes.follow}>
          {isFollow ? "Following" : "Follow"}
        </button>
        <div className={classes.playlistName}>{props.artist.name}</div>
      </div>
    </>
  );
};

export default ArtistNavigation;
