import { useNavigate } from "react-router-dom";
import classes from "./NavBar.module.css";
import dotImg from "../../images/dot.png";
import Library from "./Library";
import { useEffect, useState } from "react";
import CheckLogin from "../../Authorization/CheckLogin";
import useFetch from "../../Hooks/FetchHook";
import { libraryAction } from "../../store/libraryActions";

const NavBar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [isLoaded, error] = useFetch([
    {
      url: "https://api.spotify.com/v1/me/following?type=artist",
      saveData: libraryAction,
    },
  ]);

  useEffect(() => {
    if (isLoaded) setLoading(true);
    else setLoading(false);
  }, [isLoaded]);

  const navigateHandler = async (url) => {
    const newUrl = await CheckLogin(url);
    navigate(newUrl);
  };

  return (
    <>
      <div className={classes.logo}>
        <img src="https://i.postimg.cc/rpKfD16H/Spotify-Logo-RGB-Green.png"></img>
      </div>
      <nav>
        <ul className={classes.navLists}>
          <div
            onClick={() => {
              navigateHandler(" ");
            }}
            className={classes.link}
          >
            <div className={classes.linkTitle}>
              <img src="https://i.postimg.cc/XYZhZYTb/home.png"></img>
              <p>Home</p>
            </div>
            {window.location.pathname === "/" ? (
              <img className={classes.activeImg} src={dotImg}></img>
            ) : null}
          </div>
          <div
            onClick={() => {
              navigateHandler("/like");
            }}
            className={classes.link}
          >
            <div className={classes.linkTitle}>
              <img src="https://i.postimg.cc/8cTv342b/like.png"></img>
              <p>Like</p>
            </div>
            {window.location.pathname === "/like" ? (
              <img className={classes.activeImg} src={dotImg}></img>
            ) : null}
          </div>
        </ul>
      </nav>

      {!loading && !error && <Library />}
    </>
  );
};

export default NavBar;
