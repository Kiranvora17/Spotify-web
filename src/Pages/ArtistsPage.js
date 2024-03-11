import { useDispatch, useSelector } from "react-redux";
import ArtistHeading from "../components/Artist/ArtistHeading";
import ArtistNavigation from "../components/Artist/ArtistNavigation";
import { useCallback, useEffect, useState } from "react";
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
import Loading from "../components/Loading";

const ArtistsPage = () => {
  const artist = useSelector((state) => state.artist.Artist.items);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const dispatch = useDispatch();
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
        `https://api.spotify.com/v1/artists/${params.artistId}/top-tracks?market=IN`,
        popularAction
      );
      await fetchData(
        `https://api.spotify.com/v1/artists/${params.artistId}/albums?include_groups=album&market=IN&limit=5`,
        PopularReleaseAction
      );
      await fetchData(
        `https://api.spotify.com/v1/artists/${params.artistId}/albums?include_groups=single&market=IN&limit=5`,
        singleAction
      );
      await fetchData(
        `https://api.spotify.com/v1/artists/${params.artistId}/albums?include_groups=compilation&market=IN&limit=5`,
        compilationAction
      );
      await fetchData(
        `https://api.spotify.com/v1/artists/${params.artistId}/related-artists`,
        relatedAction
      );
      await fetchData(
        `https://api.spotify.com/v1/artists/${params.artistId}/albums?include_groups=appears_on&market=IN&limit=5`,
        appearsOnAction
      );
      setLoading(false);
    };

    fetchAll();
  }, []);

  if (!loading) {
    return (
      <>
        <ArtistHeading artist={artist} />
        <ArtistNavigation artist={artist} />
        <PopularTracks />
        <ArtistPopular />
      </>
    );
  } else {
    return <Loading />;
  }
};

export default ArtistsPage;
