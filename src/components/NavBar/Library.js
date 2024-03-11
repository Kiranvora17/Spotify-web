import { useSelector } from "react-redux";
import classes from "./Library.module.css";
import { memo } from "react";
import { useNavigate } from "react-router";

const Library = () => {
  const library = useSelector((state) => state.feed.library);
  const navigate = useNavigate();

  const navigateHandler = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div className={classes.title}>
          <img src="https://i.postimg.cc/nh05rwF6/library.png"></img>
          <p>Library</p>
        </div>
      </div>
      <div className={classes.artistLists}>
        {library.items.map((item) => {
          return (
            <div
              onClick={() => {
                navigateHandler(item.type, item.id);
              }}
              key={item.name}
              className={classes.listContainer}
            >
              <img className={classes.listImage} src={item.image}></img>
              <div className={classes.artistName}>
                <p className={classes.name}>{item.name}</p>
                <p className={classes.type}>{item.type}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Library;
