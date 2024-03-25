import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { trackAction } from "../../store/TrackAction";
import TrackPage from "../../Pages/TrackPage";
import useFetch from "../../Hooks/FetchHook";

const Tracks = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const isLoaded = useFetch(
    [
      {
        url: `https://api.spotify.com/v1/tracks/${params.trackId}?market=IN`,
        saveData: trackAction,
      },
    ],
    params.trackId
  );

  useEffect(() => {
    if (isLoaded) setLoading(true);
    else setLoading(false);
  }, [isLoaded]);

  if (!loading) {
    return <TrackPage id={params.trackId} />;
  }
};

export default Tracks;
