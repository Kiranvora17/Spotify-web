import { useSelector } from "react-redux";

import classes from "./TrackArtist.module.css";
import { useNavigate } from "react-router";

const TrackArtist = () => {
  const navigate = useNavigate();
  const artists = useSelector((state) => state.track.trackArtist);

  const navigateHandler = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  if (Object.keys(artists).length === 0) return null;
  else {
    return (
      <>
        {artists.items.map((item) => (
          <div
            onClick={() => {
              navigateHandler(item.type, item.id);
            }}
            key={item.id}
            className={classes.container}
          >
            <img src={item.image}></img>
            <div className={classes.info}>
              <p className={classes.type}>{item.type}</p>
              <p className={classes.name}>{item.name}</p>
            </div>
          </div>
        ))}
      </>
    );
  }
};

export default TrackArtist;
