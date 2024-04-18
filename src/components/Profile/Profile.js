import { useEffect, useState } from "react";
import ProfilePage from "../../Pages/ProfilePage";
import {
  ProfileArtistsActions,
  profileFollowingActions,
  profileTracksActions,
} from "../../store/ProfileActions";
import useFetch from "../../Hooks/FetchHook";

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const requestedArray = [
    {
      url: `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50`,
      saveData: ProfileArtistsActions,
    },
    {
      url: `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10`,
      saveData: profileTracksActions,
    },
    {
      url: `https://api.spotify.com/v1/me/following?type=artist&limit=50`,
      saveData: profileFollowingActions,
    },
  ];

  const [isLoaded, error] = useFetch(requestedArray);

  useEffect(() => {
    if (isLoaded) setLoading(true);
    else setLoading(false);
  }, [isLoaded]);

  if (!loading && !error) {
    return <ProfilePage />;
  }
};

export default Profile;
