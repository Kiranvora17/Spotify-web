import { useSelector } from "react-redux";
import FeedItemsList from "../Feed/FeedItemsList";

const RecommendAlbums = (props) => {
  const recommend = useSelector((state) => state.album.recommendAlbum);
  const filterRecommend = recommend.items?.filter(
    (item) => item.id !== props.id
  );

  return <FeedItemsList playlist={filterRecommend} />;
};

export default RecommendAlbums;
