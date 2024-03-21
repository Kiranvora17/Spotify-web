import { useSelector } from "react-redux";
import FeedItems from "../Feed/FeedItems";

const ArtistPopular = () => {
  const popularRelease = useSelector((state) => state.artist.popularRelease);
  const single = useSelector((state) => state.artist.single);
  const compilation = useSelector((state) => state.artist.compilation);
  const related = useSelector((state) => state.artist.related);
  const appearsOn = useSelector((state) => state.artist.appearsOn);

  return (
    <>
      {popularRelease.itemsTrim.length > 0 && (
        <FeedItems disabled={true} playlist={popularRelease} />
      )}
      {single.itemsTrim.length > 0 && (
        <FeedItems disabled={true} playlist={single} />
      )}
      {compilation.itemsTrim.length > 0 && (
        <FeedItems disabled={true} playlist={compilation} />
      )}
      {related.itemsTrim.length > 0 && (
        <FeedItems disabled={true} playlist={related} />
      )}
      {appearsOn.itemsTrim.length > 0 && (
        <FeedItems disabled={true} playlist={appearsOn} />
      )}
    </>
  );
};

export default ArtistPopular;
