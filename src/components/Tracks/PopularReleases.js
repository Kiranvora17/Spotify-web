import { useSelector } from "react-redux";
import classes from "./popularRelease.module.css";
import FeedItemsList from "../Feed/FeedItemsList";

const PopularRelease = (props) => {
  const single = useSelector((state) => state.track.single);
  const album = useSelector((state) => state.track.album);

  return (
    <>
      <div className={classes.feedContainer}>
        <div className={classes.feedHeading}>
          <h2>Popular Release by {props.name}</h2>
        </div>
        <div className={classes.itemContainer}>
          <FeedItemsList playlist={single.items} />
        </div>
      </div>
      <div className={classes.feedContainer}>
        <div className={classes.feedHeading}>
          <h2>Popular Albums by {props.name}</h2>
        </div>
        <div className={classes.itemContainer}>
          <FeedItemsList playlist={album.items} />
        </div>
      </div>
    </>
  );
};

export default PopularRelease;
