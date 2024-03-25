import { useSelector } from "react-redux";
import FeedItemsList from "../Feed/FeedItemsList";

const RecommendAlbums = (props) => {
  const recommend = useSelector((state) => state.album.recommendAlbum);
  const filterRecommend = recommend.items?.filter(
    (item) => item.id !== props.id
  );

  if (Object.keys(recommend).length === 0) return null;
  else {
    return <FeedItemsList playlist={filterRecommend} />;
  }
};

export default RecommendAlbums;
