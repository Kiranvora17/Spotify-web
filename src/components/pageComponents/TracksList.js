import { useNavigate } from "react-router";

import classes from "./TracksList.module.css";
import CheckLogin from "../../Authorization/CheckLogin";
import {
  usePlaybackState,
  usePlayerDevice,
} from "react-spotify-web-playback-sdk";

import like from "../../images/like.png";
import liked from "../../images/liked.png";
import { useDispatch, useSelector } from "react-redux";
import { modifyTrack } from "../StateModify/Modify";
import { likeActions } from "../../store/like-slice";

const TracksList = (props) => {
  const accessToken = localStorage.getItem("access_token");
  const ids = useSelector((state) => state.like.tracksIds);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const device = usePlayerDevice();
  const playstate = usePlaybackState();

  const navigateHandler = async (type, id) => {
    const newUrl = await CheckLogin(`/${type}/${id}`);
    navigate(newUrl);
  };

  const playHandler = async (uri) => {
    if (device === null) return;
    const request = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [uri],
        }),
      }
    );
  };

  const changeLike = (id) => {
    if (ids.includes(id)) {
      modifyTrack("DELETE", id);
      dispatch(likeActions.removeids({ id: id }));
      dispatch(likeActions.removeTrackids({ id: id }));
      dispatch(likeActions.removeTracks({ id: id }));
    } else if (!ids.includes(id)) {
      modifyTrack("PUT", id);
      dispatch(likeActions.addids({ id: id }));
      dispatch(likeActions.addTrackids({ id: id }));
      // dispatch(likeActions.addTracks({ id: id }));
    }
  };

  return (
    <div id="itemcontainer" className={classes.itemContainer}>
      {props.playlist.items.map((item, index) => {
        return (
          <div
            onClick={() => playHandler(item.uri)}
            key={item.id}
            className={classes.list}
          >
            <div className={classes.listindex}>
              <p>{index < 9 ? "0" + (index + 1) : index + 1}</p>
              {props.playlist.type !== "album" && (
                <img src={item.image} width={48} height={48}></img>
              )}
              <div className={classes.info}>
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateHandler(item.type, item.id);
                  }}
                  className={
                    playstate?.track_window.current_track.id === item?.id
                      ? `${classes.name} ${classes.nameActive}`
                      : `${classes.name}`
                  }
                >
                  {item.name.length > 30
                    ? item.name.slice(0, 30) + "..."
                    : item.name}
                </p>
                <p className={classes.listArtists}>
                  {item.artists.map((artist, index, array) => {
                    if (index <= 2) {
                      return (
                        <span key={artist.name}>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateHandler(artist.type, artist.id);
                            }}
                            className={classes.artist}
                          >
                            {artist.name}
                          </span>
                          <span>
                            {index <= 1 && index !== array.length - 1
                              ? ", "
                              : null}
                          </span>
                        </span>
                      );
                    }
                  })}
                </p>
              </div>
            </div>
            {props.playlist.type !== "album" && (
              <div className={classes.albumContainer}>
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateHandler(item.albumType, item.albumId);
                  }}
                  className={classes.album}
                >
                  {item.albumName.length > 30
                    ? item.albumName.slice(0, 30) + "..."
                    : item.albumName}
                </p>
              </div>
            )}
            <div className={classes.imgContainer}>
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  changeLike(item.id);
                }}
                className={
                  ids.includes(item.id)
                    ? ` ${classes.likeImg} ${classes.likeImgActive}`
                    : `${classes.likeImg}`
                }
                src={ids.includes(item.id) ? liked : like}
              ></img>
              <p className={classes.duration}>{item.duration}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TracksList;
