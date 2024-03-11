import { likeActions } from "./like-slice";

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

export const likeTrackActions = (playlist) => {
  return (dispatch) => {
    const filterData = [];
    let length = 1;

    for (const item of playlist.items) {
      const obj = {
        track_number: length < 10 ? "0" + length : length,
        artists: item.track.artists,
        duration: findDuration(item.track.duration_ms),
        id: item.track.id,
        name: item.track.name,
        type: item.track.type,
        albumId: item.track.album.id,
        albumType: item.track.album.type,
        albumName: item.track.album.name,
        image: item.track.album.images[0].url,
      };
      length++;
      filterData.push(obj);
    }
    dispatch(likeActions.setTracks({ playlist: filterData }));
  };
};

export const likeAlbumActions = (playlist) => {
  return (dispatch) => {
    const filterData = [],
      filterDataTrim = [];
    let length = 0;

    for (const item of playlist.items) {
      const obj = {
        id: item.album.id,
        image: item.album.images[0].url,
        type: item.album.type,
        name: item.album.name,
      };

      filterData.push(obj);
      if (length < 5) {
        filterDataTrim.push(obj);
        length++;
      }
    }
    dispatch(
      likeActions.setAlbum({
        playlist: filterData,
        playlistTrim: filterDataTrim,
      })
    );
  };
};

export const likePlaylistActions = (playlist) => {
  return (dispatch) => {
    const filterData = [],
      filterDataTrim = [];
    let length = 0;

    for (const item of playlist.items) {
      const obj = {
        description: item.description,
        id: item.id,
        image: item.images[0].url,
        name: item.name,
        type: item.type,
      };

      filterData.push(obj);
      if (length < 5) {
        filterDataTrim.push(obj);
        length++;
      }
    }

    dispatch(
      likeActions.setPlaylist({
        playlist: filterData,
        playlistTrim: filterDataTrim,
      })
    );
  };
};
