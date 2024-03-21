import { useNavigate } from "react-router";
import classes from "./FeedItemsList.module.css";

import play from "../../images/play-feed.png";
import CheckLogin from "../../Authorization/CheckLogin";
// import pause from "../../images/pause-feed.png";

const FeedItemsList = (props) => {
  const navigate = useNavigate();

  const navigateHandler = async (type, id) => {
    const newUrl = await CheckLogin(`/${type}/${id}`);
    navigate(newUrl);
  };

  const clickHandler = (event) => {
    event.stopPropagation();
    console.log("image clicked");
  };

  return (
    <>
      {props.playlist?.map((feed) => {
        return (
          <div
            onClick={() => {
              navigateHandler(feed.type, feed.id);
            }}
            className={classes.feed}
            key={feed.id}
          >
            <div className={classes.feedimage}>
              <img
                onClick={(event) => clickHandler(event)}
                className={classes.playpause}
                src={play}
              ></img>
              <img
                className={classes.image}
                style={{
                  borderRadius: feed.type === "artist" ? "50%" : "12px",
                }}
                src={`${feed.image}`}
              ></img>
            </div>
            <p className={classes.feedName}>
              {feed.name.length > 25
                ? feed.name.slice(0, 25) + "..."
                : feed.name}
            </p>
            <p className={classes.feedDescription}>
              {feed.description && feed.description.length > 60
                ? feed.description.slice(0, 60) + " ..."
                : feed.description}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default FeedItemsList;
