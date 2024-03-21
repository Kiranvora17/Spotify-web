import { useSelector } from "react-redux";
import classes from "./Library.module.css";
import { useNavigate } from "react-router";
import CheckLogin from "../../Authorization/CheckLogin";

const Library = () => {
  const library = useSelector((state) => state.feed.library);
  const navigate = useNavigate();

  const navigateHandler = async (type, id) => {
    const newUrl = await CheckLogin(`/${type}/${id}`);
    navigate(newUrl);
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
