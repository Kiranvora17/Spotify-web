import { useSelector } from "react-redux";
import ProfileTopTracks from "../components/Profile/ProfileTopTracks";
import Heading from "../components/pageComponents/Heading";
import heading from "../components/pageComponents/Heading.module.css";
import FeedItems from "../components/Feed/FeedItems";
import classes from "./ProfilePage.module.css";

const ProfilePage = () => {
  const artists = useSelector((state) => state.profile.artists);
  const following = useSelector((state) => state.profile.following);
  const me = useSelector((state) => state.profile.me);

  return (
    <div className={classes.container}>
      <Heading className={`${heading.profile}`} playlist={me} />
      {artists.items.length > 0 && (
        <FeedItems type={"artist"} playlist={artists} />
      )}
      <ProfileTopTracks />
      {following.items.length > 0 && (
        <FeedItems type={"artist"} playlist={following} />
      )}
    </div>
  );
};

export default ProfilePage;
