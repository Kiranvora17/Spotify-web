import { useDispatch, useSelector } from "react-redux";
import classes from "./TrackPage.module.css";
import tracks from "../components/pageComponents/Heading.module.css";
import { useCallback, useEffect, useState } from "react";
import {
  albumAction,
  recommendAction,
  singleAction,
  topTracksAction,
  trackArtistAction,
} from "../store/TrackAction";
import TrackArtist from "../components/Tracks/TrackArtist";
import TrackList from "../components/Tracks/TrackList";
import { useParams } from "react-router";
import Toptracks from "../components/Tracks/TopTracks";
import PopularRelease from "../components/Tracks/PopularReleases";
import Loading from "../components/Loading";
import Heading from "../components/pageComponents/Heading";
import Navigation from "../components/pageComponents/Navigation";

const TrackPage = (props) => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const track = useSelector((state) => state.track.track);
  const accessToken = localStorage.getItem("access_token");
  const ids = track.trackArtist.map((item) => item.id);

  const fetchData = useCallback(
    async (url, saveData) => {
      const request = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const response = await request.json();
      dispatch(saveData(response));
    },
    [accessToken]
  );

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await fetchData(
        `https://api.spotify.com/v1/artists?ids=${ids.toString()}`,
        trackArtistAction
      );

      await fetchData(
        `https://api.spotify.com/v1/recommendations?limit=5&market=IN&seed_tracks=${params.trackId}&min_popularity=60`,
        recommendAction
      );

      await fetchData(
        `https://api.spotify.com/v1/artists/${track.artists.id}/top-tracks?market=IN`,
        topTracksAction
      );

      await fetchData(
        `https://api.spotify.com/v1/artists/${track.artists.id}/albums?include_groups=single&market=IN&limit=5`,
        singleAction
      );

      await fetchData(
        `https://api.spotify.com/v1/artists/${track.artists.id}/albums?include_groups=album&market=IN&limit=5`,
        albumAction
      );

      // document.getElementById("heading").classList.add(`${tracks.track}`);
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (!loading) {
    return (
      <div className={classes.container}>
        <Heading className={`${tracks.track}`} playlist={track} />
        <Navigation id={props.id} playlist={track} />
        <TrackArtist />
        <TrackList />
        <Toptracks />
        <PopularRelease name={track.artists.name} />
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default TrackPage;
