import { useNavigate } from "react-router";

import classes from "./TracksList.module.css";

const TracksList = (props) => {
  const navigate = useNavigate();

  const navigateHandler = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div id="itemcontainer" className={classes.itemContainer}>
      {props.playlist.items.map((item) => {
        return (
          <div key={item.track_number} className={classes.list}>
            <div className={classes.listindex}>
              <p>{item.track_number}</p>
              {props.playlist.type !== "album" && (
                <img src={item.image} width={48} height={48}></img>
              )}
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
                    if (index <= 2) {
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
                          <span>
                            {index <= 1 && index !== array.length - 1
                              ? ", "
                              : null}
                          </span>
                        </span>
                      );
                    }
                  })}
                </p>
              </div>
            </div>
            {props.playlist.type !== "album" && (
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
            )}
            <p className={classes.duration}>{item.duration}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TracksList;