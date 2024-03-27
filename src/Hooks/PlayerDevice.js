import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import { PlayerAction } from "../store/player-slice";

const usePLayerDevices = () => {
  const dispatch = useDispatch();
  const device = usePlayerDevice();
  const accessToken = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  const transferPlayback = async (id) => {
    const request = await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_ids: [id],
      }),
    });
  };

  const fetchDevice = async () => {
    setLoading(true);
    const request = await fetch(
      "https://api.spotify.com/v1/me/player/devices",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const response = await request.json();
    const devices = response.devices;

    const isActive = devices.filter((device) => device.is_active === true);

    if (isActive.length === 0 && device?.status === "ready") {
      transferPlayback(device?.device_id);
      dispatch(PlayerAction.setActivedevice({ id: device?.device_id }));
    } else if (isActive.length !== 0 && device?.status === "ready") {
      dispatch(PlayerAction.setActivedevice({ id: isActive[0].id }));
    }
    localStorage.setItem("current_device", device?.device_id);
    setLoading(false);
  };

  useEffect(() => {
    fetchDevice();
  }, [device]);

  return loading;
};

export default usePLayerDevices;
