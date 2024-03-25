import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AlbumsPage from "../../Pages/AlbumsPage";
import { useParams } from "react-router";
import { albumAction } from "../../store/AlbumActions";
import useFetch from "../../Hooks/FetchHook";

const Album = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const isLoaded = useFetch(
    [
      {
        url: `https://api.spotify.com/v1/albums/${params.albumId}?market=IN`,
        saveData: albumAction,
      },
    ],
    params.albumId
  );

  useEffect(() => {
    if (isLoaded) setLoading(true);
    else setLoading(false);
  }, [isLoaded]);

  if (!loading) {
    return <AlbumsPage id={params.albumId} />;
  }
};

export default Album;
