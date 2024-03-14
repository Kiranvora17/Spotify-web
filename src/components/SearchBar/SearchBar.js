import classes from "./SearchBar.module.css";

import back from "../../images/leftArrow.png";
import to from "../../images/rightArrow.png";
import search from "../../images/search.png";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const me = useSelector((state) => state.profile.me);

  useEffect(() => {
    if (window.location.pathname === "/") {
      document.getElementById("back").classList.add(`${classes.disabled}`);
    } else {
      document.getElementById("back").classList.remove(`${classes.disabled}`);
    }
  }, [window.location.pathname]);

  const navigateHandler = () => {
    navigate("/me");
  };

  const backHandler = () => {
    navigate(-1);
  };

  const toHandler = () => {
    navigate(1);
  };

  return (
    <div className={classes.container}>
      <div className={classes.searchContainer}>
        <div>
          <button
            onClick={backHandler}
            disabled={window.location.pathname === "/" ? true : false}
          >
            <img id="back" className={classes.back} src={back}></img>
          </button>
          <button onClick={toHandler}>
            <img className={classes.back} src={to}></img>
          </button>
        </div>
        <div ref={ref} className={classes.searchbar}>
          <img src={search} width={20} height={20}></img>
          <input
            className={classes.search}
            type="text"
            placeholder="What would you like to listen today?"
          ></input>
        </div>
      </div>
      {me.name ? (
        <div onClick={navigateHandler} className={classes.profileContainer}>
          <p>{me.name}</p>
          <img
            src={
              me.image
                ? me.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk1wr1yrOBQiwirwFdBeIUAeIU9vPg09-NpaXWEipuyQ&s"
            }
          ></img>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
