import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  likeAlbumActions,
  likePlaylistActions,
  likeTrackActions,
} from "../../store/LikeActions";
import LikeTracks from "./LikeTracks";
import LikePopular from "./LikePopular";
import Loading from "../Loading";
import Heading from "../pageComponents/Heading";
import Navigation from "../pageComponents/Navigation";
import classes from "./Like.module.css";
import likes from "../pageComponents/Heading.module.css";

const Like = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("access_token");

  const fetchData = useCallback(
    async (url, saveData) => {
      const request = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const response = await request.json();
      await dispatch(saveData(response));
    },
    [accessToken]
  );

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await fetchData(
        `https://api.spotify.com/v1/me/tracks?market=IN&limit=50`,
        likeTrackActions
      );

      await fetchData(
        `https://api.spotify.com/v1/me/albums?limit=50&market=IN`,
        likeAlbumActions
      );

      await fetchData(
        "https://api.spotify.com/v1/me/playlists",
        likePlaylistActions
      );

      setLoading(false);
    };
    fetchAll();
  }, []);

  if (!loading) {
    return (
      <div className={classes.container}>
        <Heading className={`${likes.like}`} />
        <LikeTracks />
        <LikePopular />
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Like;
