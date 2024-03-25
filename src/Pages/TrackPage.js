import { useSelector } from "react-redux";
import classes from "./TrackPage.module.css";
import tracks from "../components/pageComponents/Heading.module.css";
import { useEffect, useState } from "react";
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
import Heading from "../components/pageComponents/Heading";
import Navigation from "../components/pageComponents/Navigation";
import useFetch from "../Hooks/FetchHook";

const TrackPage = (props) => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const track = useSelector((state) => state.track.track);
  const ids = track.trackArtist.map((item) => item.id);

  const requestedArray = [
    {
      url: `https://api.spotify.com/v1/artists?ids=${ids.toString()}`,
      saveData: trackArtistAction,
    },
    {
      url: `https://api.spotify.com/v1/recommendations?limit=5&market=IN&seed_tracks=${params.trackId}&min_popularity=60`,
      saveData: recommendAction,
    },
    {
      url: `https://api.spotify.com/v1/artists/${track.artists.id}/top-tracks?market=IN`,
      saveData: topTracksAction,
    },
    {
      url: `https://api.spotify.com/v1/artists/${track.artists.id}/albums?include_groups=single&market=IN&limit=5`,
      saveData: singleAction,
    },
    {
      url: `https://api.spotify.com/v1/artists/${track.artists.id}/albums?include_groups=album&market=IN&limit=5`,
      saveData: albumAction,
    },
  ];

  const isLoaded = useFetch(requestedArray);

  useEffect(() => {
    if (isLoaded) setLoading(true);
    else setLoading(false);
  }, [isLoaded]);

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
  }
};

export default TrackPage;
