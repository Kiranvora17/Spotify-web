import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  SearchArtistActions,
  SearchTrackActions,
  searchAlbumActions,
  searchPlaylistActions,
} from "../../store/SearchActions";
import SearchPage from "../../Pages/SearchPage";
import Loading from "../Loading";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");
  const params = useParams();

  const fetchdata = useCallback(async () => {
    setLoading(true);
    const request = await fetch(
      `https://api.spotify.com/v1/search?q=${params.string}&type=album%2Cartist%2Cplaylist%2Ctrack&market=IN&limit=5`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const response = await request.json();
    dispatch(SearchTrackActions(response.tracks));
    dispatch(SearchArtistActions(response.artists));
    dispatch(searchAlbumActions(response.albums));
    dispatch(searchPlaylistActions(response.playlists));
    setLoading(false);
  }, [accessToken, params.string]);

  useEffect(() => {
    fetchdata();
  }, [params.string]);

  if (!loading) return <SearchPage />;
  else if (loading) {
    return <Loading />;
  }
};

export default Search;
