import image from "../../images/loading.gif";
import classes from "./FeedLoad.module.css";
import { useCallback, useEffect, useState } from "react";
import Feed from "./Feed";
import { useDispatch, useSelector } from "react-redux";
import {
  FeaturedActions,
  TopArtistsActions,
  ViralIndiaActions,
  newReleasesActions,
  recentlyActions,
  topHitsAction,
} from "../../store/FeedActions";
import { feedActions } from "../../store/feed-slice";
import Loading from "../Loading";
import { profileActions } from "../../store/profile-slice";

const FeedLoad = () => {
  const dispatch = useDispatch();
  const isLoaded = useSelector((state) => state.feed.isLoaded);
  const [loading, setLoading] = useState(true);

  const makeApiCall = useCallback(async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("access_token");

    const fetchData = async (url, saveData) => {
      const request = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = await request.json();
      await dispatch(saveData(response));
    };

    await fetchData(
      "https://api.spotify.com/v1/browse/new-releases",
      newReleasesActions
    );

    await fetchData(
      `https://api.spotify.com/v1/me/player/recently-played?limit=50&before=${Date.now()}`,
      recentlyActions
    );

    await fetchData(
      "https://api.spotify.com/v1/browse/featured-playlists?locale=in_IN",
      FeaturedActions
    );

    await fetchData(
      "https://api.spotify.com/v1/search?q=top+hits&type=album%2Cplaylist&market=IN",
      topHitsAction
    );

    await fetchData(
      "https://api.spotify.com/v1/search?q=viral+india&type=playlist&market=IN",
      ViralIndiaActions
    );

    await fetchData(
      "https://api.spotify.com/v1/me/top/artists",
      TopArtistsActions
    );

    await fetchData("https://api.spotify.com/v1/me", profileActions.setMe);

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(feedActions.setIsLoaded());
      makeApiCall();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return <Feed />;
  }
};

export default FeedLoad;
