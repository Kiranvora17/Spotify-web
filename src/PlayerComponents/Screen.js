import { FullScreen } from "react-full-screen";
import spotify from "../images/spotify-logo-black.png";
import ColorThief from "colorthief";

import classes from "./Screen.module.css";
import {
  usePlaybackState,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import FullScreenSlider from "./FullScreenSlider";

import like from "../images/like.png";
import liked from "../images/liked.png";
import play from "../images/play-player.png";
import pause from "../images/pause-player.png";
import next from "../images/next-player.png";
import previous from "../images/previous-player.png";
import exitScreen from "../images/exit-full-screen.png";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { modifyTrack } from "../components/StateModify/Modify";
import { likeActions } from "../store/like-slice";

const Screen = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const ids = useSelector((state) => state.like.tracksIds);
  const player = usePlaybackState({ interval: true });
  const track = useSpotifyPlayer();
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;

    const handleMouseMove = () => {
      clearTimeout(timer);
      setIsMoved(false);
      timer = setTimeout(() => setIsMoved(true), 2500);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setIsLiked(ids.find((id) => id === player?.track_window.current_track.id));
  }, [player, ids]);

  const changeHandler = () => {
    if (!isMoved) {
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
          likeActions.removeTracks({
            id: player?.track_window.current_track.id,
          })
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
    }
  };

  const toggleHandler = () => {
    if (!isMoved) {
      track.togglePlay();
    }
  };

  const nextHandler = () => {
    if (!isMoved) {
      track.nextTrack();
    }
  };

  const previousHandler = () => {
    if (!isMoved) {
      track.previousTrack();
    }
  };

  const exitHandler = () => {
    if (!isMoved) {
      props.handle.exit();
    }
  };

  const setColor = (color) => {
    document.documentElement.style.cssText = `--full-screen-background: rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.8)`;
  };

  const colorHandler = () => {
    const image = document.getElementById("Image");
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(image, 8);

    setColor(palette[2]);
  };

  const findDuration = (duration) => {
    let str = "";
    const first = Math.floor(duration / 60000);
    str += `${first}:`;
    const remainer = duration % 60000;
    const second = Math.floor(remainer / 1000);
    if (second < 10) {
      str += `0${second}`;
    } else {
      str += second;
    }

    return str;
  };

  return (
    <FullScreen handle={props.handle}>
      {props.handle.active && (
        <div onClick={toggleHandler} className={classes.screenContainer}>
          <div className={classes.logoContainer}>
            <img className={classes.logo} src={spotify}></img>
            <div className={classes.titleInfo}>
              <p className={classes.type}>
                Playing From{" "}
                {player.context.uri.includes("playlist")
                  ? "playlist"
                  : player.context.uri.includes("album")
                  ? "album"
                  : player.context.uri.includes("artist")
                  ? "artist"
                  : "track"}
              </p>
              <p className={classes.name}>
                {player.context.metadata.context_description
                  ? player.context.metadata.context_description
                  : player.track_window.current_track.name}
              </p>
            </div>
          </div>
          <div className={classes.infoContainer}>
            <img
              className={classes.playerImg}
              onLoad={colorHandler}
              id="Image"
              src={player.track_window.current_track.album.images[2].url}
              crossOrigin="anonymous"
            ></img>
            <div className={classes.playerInfo}>
              <h3>{player.track_window.current_track.name}</h3>
              <p>{player.track_window.current_track.artists[0].name}</p>
            </div>
          </div>
          <div
            id="player"
            style={{ opacity: isMoved ? "0" : "100" }}
            className={classes.playerContainer}
          >
            <div className={classes.slider}>
              <div className={classes.time}>
                {findDuration(player?.position)}
              </div>
              <FullScreenSlider
                position={player?.position}
                duration={player?.duration}
              />
              <div className={classes.time}>
                {findDuration(player?.duration)}
              </div>
            </div>
            <div className={classes.playerInfoContainer}>
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  changeHandler();
                }}
                className={classes.playerLike}
                src={isLiked ? liked : like}
              ></img>
              <div className={classes.btn}>
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    previousHandler();
                  }}
                  className={classes.navBtn}
                  src={previous}
                ></img>
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleHandler();
                  }}
                  className={classes.play}
                  src={player?.paused ? play : pause}
                ></img>
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    nextHandler();
                  }}
                  className={classes.navBtn}
                  src={next}
                ></img>
              </div>
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  exitHandler();
                }}
                className={classes.exitScreen}
                src={exitScreen}
              ></img>
            </div>
          </div>
        </div>
      )}
    </FullScreen>
  );
};

export default Screen;
