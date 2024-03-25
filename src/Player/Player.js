import classes from "./Player.module.css";
import { memo, useEffect, useState } from "react";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import PlayerItem from "./PlayerItem";

const Player = () => {
  const device = usePlayerDevice();
  const accessToken = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const request = await fetch("https://api.spotify.com/v1/me/player", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_ids: [device?.device_id],
        }),
      });
      setLoading(false);
    };

    if (device?.status === "ready") {
      fetchData();
    }
  }, [device]);

  return (
    <div className={classes.playerContainer}>{!loading && <PlayerItem />}</div>
  );
};

export default memo(Player);
