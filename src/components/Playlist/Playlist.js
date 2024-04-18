import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { setPlaylistActions } from "../../store/PlaylistActions";
import PlaylistsPage from "../../Pages/PlaylistsPage";
import useFetch from "../../Hooks/FetchHook";

const Playlist = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const [isLoaded, error] = useFetch([
    {
      url: `https://api.spotify.com/v1/playlists/${params.playlistId}?market=IN`,
      saveData: setPlaylistActions,
    },
  ]);

  useEffect(() => {
    if (isLoaded) setLoading(true);
    else setLoading(false);
  }, [isLoaded]);

  if (!loading && !error) {
    return <PlaylistsPage id={params.playlistId} />;
  }
};

export default Playlist;
