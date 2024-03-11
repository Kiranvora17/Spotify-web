import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { setPlaylistActions } from "../../store/PlaylistActions";
import PlaylistsPage from "../../Pages/PlaylistsPage";

const Playlist = () => {
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
      `https://api.spotify.com/v1/playlists/${params.playlistId}?market=IN`,
      setPlaylistActions
    );
  }, []);

  if (!loading) {
    return <PlaylistsPage />;
  }
};

export default Playlist;
