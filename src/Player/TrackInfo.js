import {
  usePlaybackState
} from "react-spotify-web-playback-sdk";
import classes from "./TrackInfo.module.css";
import { useNavigate } from "react-router";
import CheckLogin from "../Authorization/CheckLogin";

import like from "../images/like.png";
import liked from "../images/liked.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyTrack } from "../components/StateModify/Modify";
import { likeActions } from "../store/like-slice";
import { findDuration } from "../store/LikeActions";
import usePlayerState from "../Hooks/PlayerState";

const TrackInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const player = usePlaybackState();
  const [isLiked, setIsLiked] = useState(false);
  const ids = useSelector((state) => state.like.tracksIds);

  useEffect(() => {
    setIsLiked(ids.find((id) => id === player?.track_window.current_track.id));
  }, [player, ids]);

  const albumHandler = (id) => {
    const newUrl = CheckLogin(`/album/${id}`);
    navigate(newUrl);
  };

  const artistHandler = (id) => {
    const newUrl = CheckLogin(`/artist/${id}`);
    navigate(newUrl);
  };

  const changeHandler = () => {
    if (isLiked) {
      modifyTrack("DELETE", player?.track_window.current_track.id);
      dispatch(
        likeActions.removeids({ id: player?.track_window.current_track.id })
      );
      dispatch(
        likeActions.removeTrackids({
          id: player?.track_window.current_track.id,
        })
      );
      dispatch(
        likeActions.removeTracks({ id: player?.track_window.current_track.id })
      );
      setIsLiked(!isLiked);
    } else if (!isLiked) {
      modifyTrack("PUT", player?.track_window.current_track.id);
      dispatch(
        likeActions.addids({ id: player?.track_window.current_track.id })
      );
      dispatch(
        likeActions.addTrackids({ id: player?.track_window.current_track.id })
      );
      dispatch(
        likeActions.addTracks({
          track: {
            artists: player?.track_window.current_track.artists,
            duration: findDuration(
              player?.track_window.current_track.duration_ms
            ),
            id: player?.track_window.current_track.id,
            name: player?.track_window.current_track.name,
            type: player?.track_window.current_track.type,
            albumId: player?.track_window.current_track.album.uri.slice(14),
            albumType: "album",
            albumName: player?.track_window.current_track.album.name,
            image: player?.track_window.current_track.album.images[0].url,
            uri: player?.track_window.current_track.uri,
          },
        })
      );
      setIsLiked(!isLiked);
    }
  };

  if (!player) return null;
  const track = player?.track_window?.current_track;

  if (track) {
    document.getElementById(
      "overlay"
    ).style.backgroundImage = `url(${track?.album.images[0].url})`;

    return (
      <div className={classes.container}>
        <img
          className={classes.trackImage}
          src={track?.album.images[0].url}
        ></img>
        <div className={classes.track}>
          <div
            onClick={() => {
              albumHandler(track.album.uri.slice(14));
            }}
            className={classes.name}
          >
            {track?.name.length > 35
              ? track?.name.slice(0, 35) + " ..."
              : track?.name}
          </div>
          <div className={classes.artist}>
            {track?.artists.map((artist, index, array) => {
              if (index <= 2) {
                return (
                  <span key={artist.name}>
                    <span
                      onClick={() => {
                        artistHandler(artist.uri.slice(15));
                      }}
                      className={classes.artistname}
                    >
                      {artist.name}
                    </span>
                    <span>
                      {index <= 1 && index !== array.length - 1 ? ", " : null}
                    </span>
                  </span>
                );
              }
            })}
          </div>
        </div>
        <div onClick={changeHandler} className={classes.like}>
          <img src={isLiked ? liked : like}></img>
        </div>
      </div>
    );
  }
};

export default TrackInfo;
