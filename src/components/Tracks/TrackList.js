import { useNavigate } from "react-router";
import classes from "./TrackList.module.css";
import { useSelector } from "react-redux";

const TrackList = () => {
  const playlist = useSelector((state) => state.track.recommend);
  const navigate = useNavigate();

  const navigateHandler = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div className={classes.itemContainer}>
      <div className={classes.heading}>
        <h3>Recommended</h3>
        <p>based on this song</p>
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
                <p className={classes.listArtists}>
                  {item.artists.map((artist, index, array) => {
                    return (
                      <span key={artist.name}>
                        <span
                          onClick={() => {
                            navigateHandler(artist.type, artist.id);
                          }}
                          className={classes.artist}
                        >
                          {artist.name}
                        </span>
                        <span>{array.length - 1 !== index ? ", " : null}</span>
                      </span>
                    );
                  })}
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

export default TrackList;
