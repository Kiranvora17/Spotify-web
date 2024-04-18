import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useFetch = (urls, changeTrigger) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(
    async (url, saveData) => {
      setLoading(true);
      const request = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!request.ok) {
        setIsError(true);
        setLoading(false);
      }

      if (request.ok) {
        const response = await request.json();
        await dispatch(saveData(response));
      }
      setLoading(false);
    },
    [accessToken, changeTrigger]
  );

  useEffect(() => {
    urls.map(async (request) => {
      await fetchData(request.url, request.saveData);
    });
  }, [changeTrigger]);

  return [loading, isError];
};

export default useFetch;
