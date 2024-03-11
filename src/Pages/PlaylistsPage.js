import { useSelector } from "react-redux";
import PlaylistHeading from "../components/Playlist/PlaylistHeading";
import PlaylistNavigation from "../components/Playlist/PlaylistNavigation";
import PlaylistList from "../components/Playlist/PlaylistList";

import classes from "./PlaylistsPage.module.css";

const PlaylistsPage = () => {
  const playlist = useSelector((state) => state.playlist.playlist);
  return (
    <div className={classes.container}>
      <PlaylistHeading playlist={playlist} />
      <PlaylistNavigation playlist={playlist} />
      <PlaylistList playlist={playlist} />
    </div>
  );
};

export default PlaylistsPage;
