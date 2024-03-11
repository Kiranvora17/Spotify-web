import classes from "./HomePage.module.css";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router";
import SearchBar from "../components/SearchBar/SearchBar";

const HomePage = () => {
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
};
export default HomePage;
