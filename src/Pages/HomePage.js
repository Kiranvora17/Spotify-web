import classes from "./HomePage.module.css";
import NavBar from "../components/NavBar/NavBar";
import { Outlet, useNavigate } from "react-router";
import SearchBar from "../components/SearchBar/SearchBar";
import { useEffect } from "react";

const HomePage = () => {
  const timeStamp = localStorage.getItem("time_stamp");
  const navigate = useNavigate();

  useEffect(() => {
    if (!timeStamp || Date.now() - timeStamp > 3600000) {
      navigate("/login");
    }
  }, []);

  if (timeStamp && Date.now() - timeStamp < 3500000) {
    return (
      <>
        <div className={classes.overlay} />
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
          </div>
        </div>
      </>
    );
  }
};
export default HomePage;
