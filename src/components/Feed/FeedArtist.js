import { useDispatch } from "react-redux";
import classes from "./FeedArtist.module.css";
import { useNavigate } from "react-router";
import { feedActions } from "../../store/feed-slice";
import FeedArtistList from "./FeedArtistList";

const FeedArtist = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAllHandler = () => {
    dispatch(
      feedActions.setFeedAll({
        playlist: props.playlist.items,
        message: props.playlist.message,
      })
    );
    const message = props.playlist.message.replaceAll(" ", "");
    navigate(`feed/${message}`);
  };

  return (
    <div className={classes.feedContainer}>
      <div className={classes.feedHeading}>
        <h2>{props.playlist.message}</h2>
        {!props.disabled && <button onClick={showAllHandler}>Show all</button>}
      </div>
      <div className={classes.itemContainer}>
        <FeedArtistList playlist={props.playlist.itemsTrim} />
      </div>
    </div>
  );
};

export default FeedArtist;
