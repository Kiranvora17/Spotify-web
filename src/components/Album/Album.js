import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AlbumsPage from "../../Pages/AlbumsPage";
import { useParams } from "react-router";
import { albumAction, recommendActions } from "../../store/AlbumActions";
import { compose } from "redux";
import { fetchData } from "../pageComponents/FetchRequests";

const Album = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");

  // const fetchData = useCallback(
  //   async (url, saveData) => {
  //     setLoading(true);
  //     const request = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     const response = await request.json();
  //     await dispatch(saveData(response));
  //     setLoading(false);
  //   },
  //   [params.albumId]
  // );

  useEffect(() => {
    fetchData(
      `https://api.spotify.com/v1/albums/${params.albumId}?market=IN`
    ).then((data) => albumAction(data));

    // fetchData(
    //   `https://api.spotify.com/v1/albums/${params.albumId}?market=IN`,
    //   albumAction,
    //   "id"
    // );
  }, [params.albumId]);

  if (!loading) {
    return <AlbumsPage id={params.albumId} />;
  }
};

export default Album;
