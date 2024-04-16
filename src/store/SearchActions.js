import { searchActions } from "./search-slice";

export const searchAlbumActions = (Playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of Playlist.items) {
      const obj = {
        name: item.name,
        image: item.images ? item.images[0].url : null,
        type: item.type,
        id: item.id,
        uri: item.uri,
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
        image: item.images ? item.images[0].url : null,
        uri: item.uri,
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
        image: item.images ? item.images[0]?.url : null,
        uri: item.uri,
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

    for (const item of playlist.items) {
      if (item.name) {
        const obj = {
          albumName: item.album.name,
          albumType: item.album.type,
          albumId: item.album.id,
          image: item.album.images ? item.album.images[0].url : null,
          artists: item.artists,
          duration: findDuration(item.duration_ms),
          id: item.id,
          type: item.type,
          name: item.name,
          uri: item.uri,
        };

        filterData.push(obj);
      }
    }

    dispatch(searchActions.setTracks({ playlist: filterData }));
  };
};
