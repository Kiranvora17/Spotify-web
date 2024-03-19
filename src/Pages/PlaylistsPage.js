import { useSelector } from "react-redux";

import classes from "./PlaylistsPage.module.css";
import playlists from "../components/pageComponents/Heading.module.css";
import Heading from "../components/pageComponents/Heading";
import Navigation from "../components/pageComponents/Navigation";
import TracksList from "../components/pageComponents/TracksList";

const PlaylistsPage = (props) => {
  const playlist = useSelector((state) => state.playlist.playlist);
  return (
    <div className={classes.container}>
      <Heading className={`${playlists.default}`} playlist={playlist} />
      <Navigation id={props.id} playlist={playlist} />
      <TracksList playlist={playlist} />
    </div>
  );
};

export default PlaylistsPage;
