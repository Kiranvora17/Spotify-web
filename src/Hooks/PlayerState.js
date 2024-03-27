import { useCallback, useEffect, useState } from "react";

const usePlayerState = () => {
  const accessToken = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  const getCurrentPlaybackState = useCallback(async () => {
    setLoading(true);
    const request = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing?market=IN",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (request.ok) {
      console.log(request);
    }
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    getCurrentPlaybackState();
  }, []);

  return loading;
};

export default usePlayerState;
