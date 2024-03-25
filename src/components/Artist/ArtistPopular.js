import { useSelector } from "react-redux";
import FeedItems from "../Feed/FeedItems";

const ArtistPopular = () => {
  const popularRelease = useSelector((state) => state.artist.popularRelease);
  const single = useSelector((state) => state.artist.single);
  const compilation = useSelector((state) => state.artist.compilation);
  const related = useSelector((state) => state.artist.related);
  const appearsOn = useSelector((state) => state.artist.appearsOn);

  if (
    Object.keys(popularRelease).length === 0 ||
    Object.keys(single).length === 0 ||
    Object.keys(compilation).length === 0 ||
    Object.keys(related).length === 0 ||
    Object.keys(appearsOn).length === 0
  )
    return null;
  else {
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
  }
};

export default ArtistPopular;
