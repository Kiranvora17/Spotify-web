import { useSelector } from "react-redux";
import FeedArtist from "../components/Feed/FeedArtist";
import ProfileTopTracks from "../components/Profile/ProfileTopTracks";
import Heading from "../components/pageComponents/Heading";
import classes from "../components/pageComponents/Heading.module.css";

const ProfilePage = () => {
  const artists = useSelector((state) => state.profile.artists);
  const following = useSelector((state) => state.profile.following);
  const me = useSelector((state) => state.profile.me);

  return (
    <>
      <Heading className={`${classes.profile}`} playlist={me} />
      <FeedArtist type={"artist"} playlist={artists} />
      <ProfileTopTracks />
      <FeedArtist type={"artist"} playlist={following} />
    </>
  );
};

export default ProfilePage;
