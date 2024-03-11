const GetRefreshToken = async () => {
  // refresh token that has been previously stored
  const url = "https://accounts.spotify.com/api/token";
  const clientId = "4382c1ae8960482f8056bd573eec9f4c";
  const refreshToken = localStorage.getItem("refresh_token");

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  };
  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem("access_token", response.access_token);
  localStorage.setItem("refresh_token", response.refresh_token);
};

export default GetRefreshToken;
