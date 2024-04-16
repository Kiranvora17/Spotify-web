import { useEffect, useRef, useState } from "react";
import {
  base64encode,
  generateRandomString,
  sha256,
} from "../Authorization/CodeVerifier";

import classes from "./Loginpage.module.css";

const getCode = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const clientId = "4382c1ae8960482f8056bd573eec9f4c";
  const redirectUri = "https://spotify-web-drab.vercel.app/login";

  const scope =
    "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-library-read playlist-read-private user-read-playback-state user-modify-playback-state streaming user-library-modify playlist-modify-private playlist-modify-public user-follow-modify";
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

const getToken = async (code) => {
  // stored in the previous step
  let codeVerifier = localStorage.getItem("code_verifier");
  const clientId = "4382c1ae8960482f8056bd573eec9f4c";
  const redirectUri = "https://spotify-web-drab.vercel.app/login";

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

  localStorage.setItem("time_stamp", Date.now());
  localStorage.setItem("access_token", response.access_token);
  localStorage.setItem("refresh_token", response.refresh_token);

  window.location.href = "https://spotify-web-drab.vercel.app/";
};

const LoginPage = () => {
  const timeStamp = localStorage.getItem("time_stamp");
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");

  useEffect(() => {
    if (code) {
      getToken(code);
    }

    if (Date.now() - timeStamp < 3500000) {
      window.location.href = "https://spotify-web-drab.vercel.app/";
    }
  }, []);

  return (
    <>
      <div className={classes.container} />
      <div className={classes.loginContainer}>
        <img
          src={"https://i.postimg.cc/rpKfD16H/Spotify-Logo-RGB-Green.png"}
          width={250}
          style={{ marginBottom: "1rem" }}
        ></img>
        <p style={{ margin: "1.5rem 1.5rem 3rem" }}>Let the Music Play..</p>
        <button onClick={getCode} className={classes.loginbtn}>
          Login
        </button>
      </div>
      <div className={classes.disclaimer}>
        * If you are first time visiting this page, then send your spotify
        username and registered email id to{" "}
        <a href="mailto:vorakiran79@gmail.com">vorakiran79@gmail.com</a>
      </div>
    </>
  );
};

export default LoginPage;
