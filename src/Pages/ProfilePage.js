import { useSelector } from "react-redux";
import FeedArtist from "../components/Feed/FeedArtist";
import ProfileTopTracks from "../components/Profile/ProfileTopTracks";
import ProfileHeading from "../components/Profile/ProfileHeading";

const ProfilePage = () => {
  const artists = useSelector((state) => state.profile.artists);
  const following = useSelector((state) => state.profile.following);

  return (
    <>
      <ProfileHeading />
      <FeedArtist type={"artist"} playlist={artists} />
      <ProfileTopTracks />
      <FeedArtist type={"artist"} playlist={following} />
    </>
  );
};

export default ProfilePage;
