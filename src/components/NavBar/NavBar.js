import { NavLink, useParams } from "react-router-dom";
import classes from "./NavBar.module.css";
import dotImg from "../../images/dot.png";
import Library from "./Library";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { libraryActions } from "../../store/FeedActions";

const NavBar = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const request = await fetch(
      "https://api.spotify.com/v1/me/following?type=artist",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const response = await request.json();
    dispatch(libraryActions(response));
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, []);

  return (
    <>
      <div className={classes.logo}>
        <img src="https://i.postimg.cc/rpKfD16H/Spotify-Logo-RGB-Green.png"></img>
      </div>
      <nav>
        <ul className={classes.navLists}>
          <NavLink to={""} className={classes.link}>
            <div className={classes.linkTitle}>
              <img src="https://i.postimg.cc/XYZhZYTb/home.png"></img>
              <p>Home</p>
            </div>
            {window.location.pathname === "/" ? (
              <img className={classes.activeImg} src={dotImg}></img>
            ) : null}
          </NavLink>
          <NavLink to={"/like"} className={classes.link}>
            <div className={classes.linkTitle}>
              <img src="https://i.postimg.cc/8cTv342b/like.png"></img>
              <p>Like</p>
            </div>
            {window.location.pathname === "/like" ? (
              <img className={classes.activeImg} src={dotImg}></img>
            ) : null}
          </NavLink>
        </ul>
      </nav>

      {!loading && <Library />}
    </>
  );
};

export default NavBar;