import { useState, useEffect } from "react";
import classes from "./AlbumNavigation.module.css";

import like from "../../images/like.png";
import liked from "../../images/liked.png";
import duration from "../../images/duration.png";
import hash from "../../images/hash.png";

const AlbumNavigation = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const playUrl = "https://i.postimg.cc/W1Y1PWzS/icons8-play-50-1.png";
  const pauseUrl = "https://i.postimg.cc/tTmyQL7z/icons8-pause-button-50-1.png";

  useEffect(() => {
    const primary = document.getElementById("primary");
    const scrollWatcher = document.getElementById("scroll-data-watcher");
    const title = document.getElementById("title");
    const itemcontainer = document.getElementById("itemcontainer");

    const navObserver = new IntersectionObserver((entry) => {
      primary.classList.toggle(`${classes.sticky}`, !entry[0].isIntersecting);
      title.classList.toggle(
        `${classes.titleSticky}`,
        !entry[0].isIntersecting
      );
    });

    const navObserverOut = new IntersectionObserver(
      (entry) => {
        title.classList.toggle(`${classes.opacity}`, !entry[0].isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-30%",
      }
    );

    navObserver.observe(scrollWatcher);
    navObserverOut.observe(itemcontainer);
  }, []);

  const changeSrc = () => {
    setIsPlaying(!isPlaying);
  };

  const changeLike = () => {
    setIsLiked(!isLiked);
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
        <img
          className={classes.like}
          onClick={changeLike}
          src={isLiked ? liked : like}
          width={30}
          height={30}
        ></img>
        <div className={classes.playlistName}>{props.playlist.name}</div>
      </div>
      <div id="title" className={classes.titlelist}>
        <div className={classes.index}>
          <img src={hash} width={18} height={18}></img>
          <p>Title</p>
        </div>
        <img src={duration} width={18} height={18}></img>
      </div>
    </>
  );
};

export default AlbumNavigation;
