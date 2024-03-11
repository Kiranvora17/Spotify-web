import { useDispatch, useSelector } from "react-redux";
import FeedItemsList from "../Feed/FeedItemsList";
import { useCallback, useEffect, useState } from "react";
import { recommendActions } from "../../store/AlbumActions";
import AlbumLoad from "./AlbumLoad";

const RecommendAlbum = (props) => {
  const accessToken = localStorage.getItem("access_token");
  const id = useSelector((state) => state.album.albumPlaylist.artists.id);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const request = await fetch(
      `https://api.spotify.com/v1/artists/${id}/albums?include_groups=appears_on%2Ccompilation%2Calbum&market=IN`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const response = await request.json();
    dispatch(recommendActions(response, props.id));
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    fetchData();
  }, []);

  if (!loading) {
    return <AlbumLoad />;
  }
};

export default RecommendAlbum;
