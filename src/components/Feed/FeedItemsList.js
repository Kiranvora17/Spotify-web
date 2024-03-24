import { useNavigate } from "react-router";
import classes from "./FeedItemsList.module.css";

import play from "../../images/play-feed.png";
import CheckLogin from "../../Authorization/CheckLogin";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import pause from "../../images/pause-feed.png";

const FeedItemsList = (props) => {
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const state = usePlaybackState();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  const navigateHandler = async (type, id) => {
    const newUrl = await CheckLogin(`/${type}/${id}`);
    navigate(newUrl);
  };

  const clickHandler = async (uri) => {
    if (device === null) return;
    if (state?.context.uri === uri) {
      player.togglePlay();
    } else {
      const request = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            context_uri: `${uri}`,
            position_ms: 0,
          }),
        }
      );
    }
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
                onClick={(event) => {
                  event.stopPropagation();
                  clickHandler(feed.uri);
                }}
                className={
                  feed.uri === state?.context.uri
                    ? `${classes.playpause} ${classes.playpauseActive}`
                    : `${classes.playpause}`
                }
                src={
                  feed.uri === state?.context.uri
                    ? state.paused
                      ? play
                      : pause
                    : play
                }
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
