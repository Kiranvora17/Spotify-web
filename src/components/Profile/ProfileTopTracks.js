import { useSelector } from "react-redux";
import classes from "./ProfileTopTracks.module.css";
import { useNavigate } from "react-router";

const ProfileTopTracks = () => {
  const navigate = useNavigate();
  const playlist = useSelector((state) => state.profile.tracks);

  const navigateHandler = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div className={classes.itemContainer}>
      <div className={classes.heading}>
        <p>Top tracks this Month</p>
        <p className={classes.info}>only visible to you</p>
      </div>
      {playlist.items.map((item) => {
        return (
          <div key={item.track_number} className={classes.list}>
            <div className={classes.listindex}>
              <p>{item.track_number}</p>
              <img src={item.image} width={48} height={48}></img>
              <div className={classes.info}>
                <p
                  onClick={() => {
                    navigateHandler(item.type, item.id);
                  }}
                  className={classes.name}
                >
                  {item.name.length > 30
                    ? item.name.slice(0, 30) + "..."
                    : item.name}
                </p>
              </div>
            </div>
            <p
              onClick={() => {
                navigateHandler(item.albumType, item.albumId);
              }}
              className={classes.album}
            >
              {item.albumName.length > 30
                ? item.albumName.slice(0, 30) + "..."
                : item.albumName}
            </p>
            <p className={classes.duration}>{item.duration}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileTopTracks;
