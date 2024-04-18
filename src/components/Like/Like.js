import { useState } from "react";
import { useEffect } from "react";
import {
  likeAlbumActions,
  likePlaylistActions,
  likeTrackActions,
} from "../../store/LikeActions";
import LikeTracks from "./LikeTracks";
import LikePopular from "./LikePopular";
import Loading from "../Loading";
import Heading from "../pageComponents/Heading";
import classes from "./Like.module.css";
import likes from "../pageComponents/Heading.module.css";
import useFetch from "../../Hooks/FetchHook";

const Like = () => {
  const [loading, setLoading] = useState(true);

  const requestedArray = [
    {
      url: `https://api.spotify.com/v1/me/albums?limit=50&market=IN`,
      saveData: likeAlbumActions,
    },
    {
      url: "https://api.spotify.com/v1/me/playlists",
      saveData: likePlaylistActions,
    },
  ];

  const [isLoaded, error] = useFetch(requestedArray);

  useEffect(() => {
    if (isLoaded) setLoading(true);
    else setLoading(false);
  }, [isLoaded]);

  if (!loading && !error) {
    return (
      <div className={classes.container}>
        <Heading className={`${likes.like}`} />
        <LikeTracks />
        <LikePopular />
      </div>
    );
  }
};

export default Like;
