import { useCallback, useEffect, useState } from "react";

const useAvailableDevice = (isActive) => {
  const accessToken = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchDevices = useCallback(async () => {
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
    setData(response);
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    if (isActive) {
      fetchDevices();
    }
  }, [isActive, fetchDevices]);

  return [loading, data];
};

export default useAvailableDevice;
