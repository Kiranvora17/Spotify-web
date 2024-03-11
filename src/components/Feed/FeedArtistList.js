import { useNavigate } from "react-router";
import classes from "./FeedArtistList.module.css";

const FeedArtistList = (props) => {
  const navigate = useNavigate();
  const navigateHandler = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <>
      {props.playlist.map((feed) => {
        return (
          <div
            onClick={() => {
              navigateHandler(feed.type, feed.id);
            }}
            className={classes.feed}
            key={feed.id}
          >
            <div>
              <img className={classes.image} src={`${feed.image}`}></img>
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

export default FeedArtistList;
