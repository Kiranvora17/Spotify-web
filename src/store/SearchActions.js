import { searchActions } from "./search-slice";

export const searchAlbumActions = (Playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of Playlist.items) {
      const obj = {
        name: item.name,
        image: item.images[0].url,
        type: item.type,
        id: item.id,
      };

      filterData.push(obj);
    }
    dispatch(searchActions.setAlbum({ playlist: filterData }));
  };
};

export const searchPlaylistActions = (playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of playlist.items) {
      const obj = {
        name: item.name,
        type: item.type,
        id: item.id,
        image: item.images[0].url,
      };

      filterData.push(obj);
    }

    dispatch(searchActions.setPlaylist({ playlist: filterData }));
  };
};

export const SearchArtistActions = (playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of playlist.items) {
      const obj = {
        name: item.name,
        type: item.type,
        id: item.id,
        image: item.images[0]?.url,
      };
      filterData.push(obj);
    }

    dispatch(searchActions.setArtist({ playlist: filterData }));
  };
};

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

export const SearchTrackActions = (playlist) => {
  return (dispatch) => {
    const filterData = [];
    let length = 1;

    for (const item of playlist.items) {
      const obj = {
        track_number: length < 10 ? "0" + length : length,
        albumName: item.album.name,
        albumType: item.album.type,
        albumId: item.album.id,
        image: item.album.images[0].url,
        artists: item.artists,
        duration: findDuration(item.duration_ms),
        id: item.id,
        type: item.type,
        name: item.name,
      };

      filterData.push(obj);
      length++;
    }

    dispatch(searchActions.setTracks({ playlist: filterData }));
  };
};
