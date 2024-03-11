import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";

import FeedItemsAll from "./components/Feed/FeedItemsAll";
import { useEffect } from "react";
import {
  base64encode,
  generateRandomString,
  sha256,
} from "./Authorization/CodeVerifier";
import GetRefreshToken from "./Authorization/RefreshToken";
import FeedLoad from "./components/Feed/FeedLoad";
import Album from "./components/Album/Album";
import Playlist from "./components/Playlist/Playlist";
import Artist from "./components/Artist/Artist";
import Tracks from "./components/Tracks/Tracks";
import Like from "./components/Like/Like";

const getCode = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const clientId = "4382c1ae8960482f8056bd573eec9f4c";
  const redirectUri = "http://localhost:3000/";

  const scope =
    "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-library-read playlist-read-private";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

function removeQueryParameters() {
  var newURL =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  window.history.replaceState({}, document.title, newURL);
}

const getToken = async (code) => {
  // stored in the previous step
  let codeVerifier = localStorage.getItem("code_verifier");
  const clientId = "4382c1ae8960482f8056bd573eec9f4c";
  const redirectUri = "http://localhost:3000/";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch("https://accounts.spotify.com/api/token", payload);
  const response = await body.json();

  removeQueryParameters();

  localStorage.setItem("access_token", response.access_token);
  localStorage.setItem("refresh_token", response.refresh_token);

  setInterval(() => {
    GetRefreshToken();
  }, 3500000);
};

function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    if (!code) {
      getCode();
    } else {
      getToken(code);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
      children: [
        { path: "", element: <FeedLoad /> },
        { path: "feed/:feedName", element: <FeedItemsAll /> },
        { path: "album/:albumId", element: <Album /> },
        { path: "playlist/:playlistId", element: <Playlist /> },
        { path: "artist/:artistId", element: <Artist /> },
        { path: "track/:trackId", element: <Tracks /> },
        { path: "like", element: <Like /> },
        { path: "like/:likeType", element: <FeedItemsAll /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
