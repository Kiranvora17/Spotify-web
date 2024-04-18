import { useParams } from "react-router";
import ArtistsPage from "../../Pages/ArtistsPage";
import { artistAction } from "../../store/ArtistActions";
import { useEffect, useState } from "react";
import useFetch from "../../Hooks/FetchHook";

const Artist = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const [isLoaded, error] = useFetch(
    [
      {
        url: `https://api.spotify.com/v1/artists/${params.artistId}`,
        saveData: artistAction,
      },
    ],
    params.artistId
  );

  useEffect(() => {
    if (isLoaded) setLoading(true);
    else setLoading(false);
  }, [isLoaded]);

  if (!loading && !error) {
    return <ArtistsPage />;
  }
};

export default Artist;
