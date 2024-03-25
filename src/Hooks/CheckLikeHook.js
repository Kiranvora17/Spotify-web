import { useCallback, useEffect, useState } from "react";

const useCheckLike = (url) => {
  const accessToken = localStorage.getItem("access_token");
  const [result, setResult] = useState(false);

  const checkLike = useCallback(async () => {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const response = request.json();
    setResult(response[0]);
  }, [accessToken]);

  useEffect(() => {
    checkLike();
  }, []);

  return result;
};

export default useCheckLike;
