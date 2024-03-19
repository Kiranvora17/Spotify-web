import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Navigation.module.css";
import like from "../../images/like.png";
import hash from "../../images/hash.png";
import duration from "../../images/duration.png";
import play from "../../images/play-navigation.png";
import pause from "../../images/pause-navigation.png";

const Navigation = (props) => {
  const [isFollow, setIsFollow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const primary = document.getElementById("primary");
    const scrollWatcher = document.getElementById("scroll-data-watcher");
    const title = document.getElementById("title");
    const itemcontainer = document.getElementById("itemcontainer");
    let navObserverOut;

    const navObserver = new IntersectionObserver((entry) => {
      primary.classList.toggle(`${classes.sticky}`, !entry[0].isIntersecting);
      {
        (props.playlist?.type === "album" ||
          props.playlist?.type === "playlist") &&
          title.classList.toggle(
            `${classes.titleSticky}`,
            !entry[0].isIntersecting
          );
      }
    });

    if (
      props.playlist?.type === "album" ||
      props.playlist?.type === "playlist"
    ) {
      navObserverOut = new IntersectionObserver(
        (entry) => {
          title.classList.toggle(
            `${classes.opacity}`,
            !entry[0].isIntersecting
          );
        },
        {
          threshold: 0,
          rootMargin: "-30%",
        }
      );
      navObserverOut.observe(itemcontainer);
    }

    navObserver.observe(scrollWatcher);

    return () => {
      navObserver.unobserve(scrollWatcher);

      if (
        props.playlist?.type === "album" ||
        props.playlist?.type === "playlist"
      ) {
        navObserverOut.unobserve(itemcontainer);
      }
    };
  }, []);

  const changeSrc = () => {
    setIsPlaying(!isPlaying);
  };

  const changeLike = () => {
    setIsLiked(!isLiked);
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
          src={isPlaying ? pause : play}
        ></img>
        {props.playlist?.type !== "like" &&
          props.playlist?.type !== "artist" && (
            <img
              className={classes.like}
              onClick={changeLike}
              src={like}
              width={30}
              height={30}
            ></img>
          )}
        {props.playlist?.type === "artist" && (
          <button onClick={changeFollow} className={classes.follow}>
            {isFollow ? "Following" : "Follow"}
          </button>
        )}
        <div className={classes.playlistName}>{props.playlist.name}</div>
      </div>
      {(props.playlist?.type === "album" ||
        props.playlist?.type === "playlist") && (
        <div id="title" className={classes.titlelist}>
          <div className={classes.index}>
            <img src={hash} width={18} height={18}></img>
            <p>Title</p>
          </div>
          {props.playlist?.type === "playlist" && <p>Album</p>}
          <img src={duration} width={18} height={18}></img>
        </div>
      )}
    </>
  );
};

export default Navigation;
