import { useNavigate } from "react-router";
import classes from "./AlbumList.module.css";
import like from "../../images/like.png";

const AlbumList = (props) => {
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
              <div className={classes.info}>
                <p
                  onClick={() => {
                    navigateHandler(item.type, item.id);
                  }}
                  className={classes.name}
                >
                  {item.name}
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
            <div className={classes.durationContainer}>
              <img src={like} width={20} height={20}></img>
              <p className={classes.duration}>{item.duration}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlbumList;
