import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  PopularReleaseAction,
  appearsOnAction,
  compilationAction,
  popularAction,
  relatedAction,
  singleAction,
} from "../store/ArtistActions";
import PopularTracks from "../components/Artist/PopularTracks";
import ArtistPopular from "../components/Artist/ArtistPopular";
import Heading from "../components/pageComponents/Heading";
import Navigation from "../components/pageComponents/Navigation";
import classes from "./ArtistsPage.module.css";
import artists from "../components/pageComponents/Heading.module.css";
import useFetch from "../Hooks/FetchHook";

const ArtistsPage = () => {
  const artist = useSelector((state) => state.artist.Artist.items);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const requestArray = [
    {
      url: `https://api.spotify.com/v1/artists/${params.artistId}/top-tracks?market=IN`,
      saveData: popularAction,
    },
    {
      url: `https://api.spotify.com/v1/artists/${params.artistId}/albums?include_groups=album&market=IN&limit=5`,
      saveData: PopularReleaseAction,
    },
    {
      url: `https://api.spotify.com/v1/artists/${params.artistId}/albums?include_groups=single&market=IN&limit=5`,
      saveData: singleAction,
    },
    {
      url: `https://api.spotify.com/v1/artists/${params.artistId}/albums?include_groups=compilation&market=IN&limit=5`,
      saveData: compilationAction,
    },
    {
      url: `https://api.spotify.com/v1/artists/${params.artistId}/related-artists`,
      saveData: relatedAction,
    },
    {
      url: `https://api.spotify.com/v1/artists/${params.artistId}/albums?include_groups=appears_on&market=IN&limit=5`,
      saveData: appearsOnAction,
    },
  ];

  const isLoaded = useFetch(requestArray);

  useEffect(() => {
    if (isLoaded) setLoading(true);
    else setLoading(false);
  }, [isLoaded]);

  if (!loading) {
    return (
      <div className={classes.container}>
        <Heading className={`${artists.artist}`} playlist={artist} />
        <Navigation playlist={artist} />
        <PopularTracks />
        <ArtistPopular />
      </div>
    );
  }
};

export default ArtistsPage;
