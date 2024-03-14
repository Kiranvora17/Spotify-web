import { useCallback, useEffect, useState } from "react";
import ProfilePage from "../../Pages/ProfilePage";
import { useDispatch } from "react-redux";
import {
  ProfileArtistsActions,
  profileFollowingActions,
  profileTracksActions,
} from "../../store/ProfileActions";

const Profile = () => {
  const accessToken = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    async (url, saveData) => {
      setLoading(true);
      const request = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const response = await request.json();
      await dispatch(saveData(response));
      setLoading(false);
    },
    [accessToken]
  );

  useEffect(() => {
    const fetchAll = async () => {
      await fetchData(
        `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50`,
        ProfileArtistsActions
      );

      await fetchData(
        `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10`,
        profileTracksActions
      );

      await fetchData(
        `https://api.spotify.com/v1/me/following?type=artist&limit=50`,
        profileFollowingActions
      );
    };

    fetchAll();
  }, []);

  if (!loading) {
    return <ProfilePage />;
  }
};

export default Profile;
