import { useParams } from "react-router";
import { albumActions } from "./album-slice";

const findDuration = (duration) => {
  let str = "";
  const first = Math.trunc(duration / 60000);
  str += `${first}:`;
  const remainer = duration % 60000;
  const second = Math.trunc(remainer / 1000);
  if (second < 10) {
    str += `0${second}`;
  } else {
    str += second;
  }

  return str;
};

export const albumAction = (playList) => {
  return (dispatch) => {
    const filterTracks = [];

    for (const item of playList.tracks.items) {
      const duration = findDuration(item.duration_ms);
      const obj = {
        id: item.id,
        type: item.type,
        artists: item.artists,
        trackHref: item.href,
        name: item.name,
        track_number:
          item.track_number < 10 ? "0" + item.track_number : item.track_number,
        duration: duration,
        uri: item.uri,
      };

      filterTracks.push(obj);
    }

    dispatch(
      albumActions.setAlbumPlaylist({
        artists: playList.artists[0],
        release_date: playList.release_date.substr(0, 4),
        playlist: filterTracks,
        image: playList.images[0].url,
        name: playList.name,
        total_tracks: playList.total_tracks,
        type: playList.type,
        uri: playList.uri,
      })
    );
  };
};

export const recommendActions = (playlist) => {
  return (dispatch) => {
    // const params = useParams();
    const filterData = [];

    for (const item of playlist.items) {
      const obj = {
        artists: item.artists[0],
        href: item.href,
        id: item.id,
        image: item.images[0].url,
        name: item.name,
        type: item.type,
        uri: item.uri,
      };

      filterData.push(obj);
    }

    dispatch(albumActions.setRecommend({ playlist: filterData }));
  };
};
