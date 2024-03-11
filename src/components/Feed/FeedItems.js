import { useNavigate } from "react-router";
import classes from "./FeedItems.module.css";
import FeedItemsList from "./FeedItemsList";
import { useDispatch } from "react-redux";
import { feedActions } from "../../store/feed-slice";

const FeedItems = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAllHandler = () => {
    dispatch(
      feedActions.setFeedAll({
        playlist: props.playlist.items,
        message: props.playlist.message,
      })
    );

    if (window.location.pathname === "/feed") {
      const message = props.playlist.message.replaceAll(" ", "");
      navigate(`feed/${message}`);
    } else if (window.location.pathname === "/like") {
      navigate(`${props.playlist.type}`);
    }
  };

  return (
    <div className={classes.feedContainer}>
      <div className={classes.feedHeading}>
        <h2>{props.playlist.message}</h2>
        {!props.disabled && <button onClick={showAllHandler}>Show all</button>}
      </div>
      <div className={classes.itemContainer}>
        <FeedItemsList playlist={props.playlist.itemsTrim} />
      </div>
    </div>
  );
};

export default FeedItems;
