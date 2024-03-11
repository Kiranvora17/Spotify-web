import { useSelector } from "react-redux";
import FeedItems from "../Feed/FeedItems";

const LikePopular = () => {
  const album = useSelector((state) => state.like.album);
  const playlist = useSelector((state) => state.like.playlist);

  return (
    <>
      <FeedItems
        disabled={album.items.length > 5 ? false : true}
        playlist={album}
      />
      <FeedItems
        disabled={playlist.items.length > 5 ? false : true}
        playlist={playlist}
      />
    </>
  );
};

export default LikePopular;
