import { useParams } from "react-router";
import ArtistsPage from "../../Pages/ArtistsPage";
import { artistAction } from "../../store/ArtistActions";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Artist = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");

  const fetchData = useCallback(
    async (url, saveData) => {
      setLoading(true);
      const request = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const response = await request.json();
      dispatch(saveData(response));
      setLoading(false);
    },
    [accessToken]
  );

  useEffect(() => {
    fetchData(
      `https://api.spotify.com/v1/artists/${params.artistId}`,
      artistAction
    );
  }, [params.artistId]);

  if (!loading) {
    return <ArtistsPage />;
  }
};

export default Artist;
