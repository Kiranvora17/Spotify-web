import classes from "./HomePage.module.css";
import NavBar from "../components/NavBar/NavBar";
import { Outlet, useNavigate } from "react-router";
import SearchBar from "../components/SearchBar/SearchBar";
import { useCallback, useEffect } from "react";
import Player from "../Player/Player";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import CheckLogin from "../Authorization/CheckLogin";
import GetRefreshToken from "../Authorization/RefreshToken";

const HomePage = () => {
  const timeStamp = localStorage.getItem("time_stamp");
  const navigate = useNavigate();

  useEffect(() => {
    if (!timeStamp || Date.now() - timeStamp > 3500000) {
      navigate("/login");
    }

    let timer = setInterval(() => {
      const generate = async () => {
        await GetRefreshToken();
        localStorage.setItem("time_stamp", Date.now());
      };
      generate();
    }, 3500000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getToken = useCallback((callback) => {
    const token = localStorage.getItem("access_token");
    const newToken = CheckLogin(token);
    callback(newToken);
  }, []);

  if (timeStamp && Date.now() - timeStamp < 3500000) {
    return (
      <>
        <WebPlaybackSDK
          deviceName="Project 1"
          getOAuthToken={getToken}
          volume={1}
        >
          <div id="overlay" className={classes.overlay} />
          <div className={classes.background}>
            <div className={classes.gridContainer}>
              <div className={classes.navBar}>
                <NavBar />
              </div>
              <div className={classes.searchBar}>
                <SearchBar />
              </div>
              <div className={classes.main}>
                <Outlet />
              </div>
              <div className={classes.player}>
                <Player />
              </div>
            </div>
          </div>
        </WebPlaybackSDK>
      </>
    );
  }
};
export default HomePage;
