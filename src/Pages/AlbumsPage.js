import classes from "./AlbumsPage.module.css";
import album from "../components/pageComponents/Heading.module.css";
import { useSelector } from "react-redux";

import Heading from "../components/pageComponents/Heading";
import Navigation from "../components/pageComponents/Navigation";
import TracksList from "../components/pageComponents/TracksList";
import { useEffect, useState } from "react";
import { recommendActions } from "../store/AlbumActions";
import RecommendAlbums from "../components/Album/RecommendAlbums";
import useFetch from "../Hooks/FetchHook";

const AlbumsPage = (props) => {
  const [loading, setLoading] = useState(true);
  const playlist = useSelector((state) => state.album.albumPlaylist);

  const isLoaded = useFetch([
    {
      url: `https://api.spotify.com/v1/artists/${playlist.artists.id}/albums?include_groups=appears_on%2Ccompilation%2Calbum&market=IN`,
      saveData: recommendActions,
    },
  ]);

  useEffect(() => {
    if (isLoaded) setLoading(true);
    else setLoading(false);
  }, [isLoaded]);

  return (
    <>
      <div className={classes.container}>
        <Heading className={`${album.default}`} playlist={playlist} />
        <Navigation id={props.id} playlist={playlist} />
        <TracksList playlist={playlist} />
        {playlist.artists.name !== "Various Artists" &&
          playlist.items.length > 0 && (
            <div className={classes.recommend}>
              <h3 className={classes.recommendtitle}>
                More by {playlist.artists.name}
              </h3>
              <div className={classes.recommendContainer}>
                {!loading && <RecommendAlbums id={playlist.artists.id} />}
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default AlbumsPage;
