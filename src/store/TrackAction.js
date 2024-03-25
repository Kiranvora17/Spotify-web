import { trackActions } from "./track-slice";

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

export const trackAction = (playlist) => {
  return (dispatch) => {
    const obj = {
      artists: playlist.album.artists[0],
      image: playlist.album.images[0].url,
      albumName: playlist.album.name,
      type: playlist.type,
      trackArtist: playlist.artists,
      duration: findDuration(playlist.duration_ms),
      name: playlist.name,
      uri: playlist.uri,
      id: playlist.id,
    };

    dispatch(trackActions.setTrack({ track: obj }));
  };
};

export const trackArtistAction = (playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of playlist.artists) {
      const obj = {
        name: item.name,
        id: item.id,
        type: item.type,
        image: item.images[0]?.url,
      };

      filterData.push(obj);
    }
    dispatch(trackActions.setTrackArtist({ artist: filterData }));
  };
};

export const recommendAction = (playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of playlist.tracks) {
      const obj = {
        duration: findDuration(item.duration_ms),
        id: item.id,
        type: item.type,
        name: item.name,
        image: item.album.images[0].url,
        albumName: item.album.name,
        albumType: item.album.type,
        albumId: item.album.id,
        artists: item.artists,
        uri: item.uri,
      };

      filterData.push(obj);
      length++;
    }

    dispatch(trackActions.setRecommend({ playlist: filterData }));
  };
};

export const topTracksAction = (playlist) => {
  return (dispatch) => {
    const filterdata = [];

    for (const item of playlist.tracks) {
      const obj = {
        duration: findDuration(item.duration_ms),
        name: item.name,
        id: item.id,
        type: item.type,
        artists: item.artists,
        image: item.album.images[0].url,
        albumId: item.album.id,
        albumName: item.album.name,
        albumType: item.album.type,
        uri: item.uri,
      };
      length++;
      filterdata.push(obj);
    }

    dispatch(trackActions.setTopTracks({ playlist: filterdata }));
  };
};

export const singleAction = (playlist) => {
  return (dispatch) => {
    const filterdata = [];

    for (const item of playlist.items) {
      const obj = {
        id: item.id,
        image: item.images[0].url,
        name: item.name,
        type: item.type,
        uri: item.uri,
      };

      filterdata.push(obj);
    }

    dispatch(trackActions.setSingle({ playlist: filterdata }));
  };
};

export const albumAction = (playlist) => {
  return (dispatch) => {
    const filterdata = [];

    for (const item of playlist.items) {
      const obj = {
        id: item.id,
        image: item.images[0].url,
        name: item.name,
        type: item.type,
        uri: item.uri,
      };

      filterdata.push(obj);
    }

    dispatch(trackActions.setAlbum({ playlist: filterdata }));
  };
};
