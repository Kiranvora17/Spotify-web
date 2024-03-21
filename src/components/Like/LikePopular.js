import { useSelector } from "react-redux";
import FeedItems from "../Feed/FeedItems";

const LikePopular = () => {
  const album = useSelector((state) => state.like.album);
  const playlist = useSelector((state) => state.like.playlist);

  return (
    <>
      {album.items.length > 0 && (
        <FeedItems
          disabled={album.items.length > 5 ? false : true}
          playlist={album}
        />
      )}
      {playlist.items.length > 0 && (
        <FeedItems
          disabled={playlist.items.length > 5 ? false : true}
          playlist={playlist}
        />
      )}
    </>
  );
};

export default LikePopular;
