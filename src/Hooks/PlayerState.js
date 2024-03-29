import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePlayerDevice, useWebPlaybackSDKReady } from "react-spotify-web-playback-sdk";

const usePlayerState = () => {
  const accessToken = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  const getCurrentPlaybackState = useCallback(async () => {
    // setLoading(true);
    const request = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing?market=IN",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    //   const response = await request.json();
    // console.log(response);
    console.log(await request.json());
    // setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    console.log('playerstate called');
      getCurrentPlaybackState();
  }, []);

  return loading;
};

export default usePlayerState;
