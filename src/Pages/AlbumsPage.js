import classes from "./AlbumsPage.module.css";
import { useSelector } from "react-redux";

import RecommendAlbum from "../components/Album/RecommendAlbum";
import AlbumHeading from "../components/Album/AlbumHeading";
import AlbumNavigation from "../components/Album/AlbumNavigation";
import AlbumList from "../components/Album/AlbumList";

const AlbumsPage = (props) => {
  const playlist = useSelector((state) => state.album.albumPlaylist);

  return (
    <div className={classes.container}>
      <AlbumHeading playlist={playlist} />
      <AlbumNavigation playlist={playlist} />
      <AlbumList playlist={playlist} />
      {playlist.artists.name !== "Various Artists" && (
        <div className={classes.recommend}>
          <h3 className={classes.recommendtitle}>
            More by {playlist.artists.name}
          </h3>
          <div className={classes.recommendContainer}>
            <RecommendAlbum id={props.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumsPage;
