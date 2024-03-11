import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { trackAction } from "../../store/TrackAction";
import TrackPage from "../../Pages/TrackPage";

const Tracks = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const accesToken = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    async (url, saveData) => {
      setLoading(true);
      const request = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      });

      const response = await request.json();
      await dispatch(saveData(response));
      setLoading(false);
    },
    [accesToken]
  );

  useEffect(() => {
    fetchData(
      `https://api.spotify.com/v1/tracks/${params.trackId}?market=IN`,
      trackAction
    );
  }, [params.trackId]);

  if (!loading) {
    return <TrackPage />;
  }
};

export default Tracks;
