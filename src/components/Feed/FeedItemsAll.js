import { useSelector } from "react-redux";
import classes from "./FeedItemsAll.module.css";
import FeedItemsList from "./FeedItemsList";
import { useEffect, useRef } from "react";

const FeedItemsAll = () => {
  const element = useRef();

  useEffect(() => {
    element.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const playlist = useSelector((state) => state.feed.feedAll);

  return (
    <div ref={element} className={classes.feedContainer}>
      <div className={classes.feedHeading}>
        <h2>{playlist.message}</h2>
      </div>
      <div className={classes.itemContainer}>
        <FeedItemsList type={playlist.type} playlist={playlist.items} />
      </div>
    </div>
  );
};

export default FeedItemsAll;
