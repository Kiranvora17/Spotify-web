import { profileActions } from "./profile-slice";

export const ProfileArtistsActions = (playlist) => {
  return (dispatch) => {
    const filterData = [],
      filterDataTrim = [];
    let length = 0;

    for (const item of playlist.items) {
      const obj = {
        id: item.id,
        image: item.images[0]?.url,
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
      profileActions.setArtists({
        playlist: filterData,
        playlistTrim: filterDataTrim,
      })
    );
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

export const profileTracksActions = (playlist) => {
  return (dispatch) => {
    const filterData = [],
      filterDataTrim = [];
    let length = 1;

    for (const item of playlist.items) {
      const obj = {
        track_number: length < 10 ? "0" + length : length,
        duration: findDuration(item.duration_ms),
        albumId: item.album.id,
        image: item.album.images[0].url,
        albumName: item.album.name,
        albumType: item.album.type,
        artists: item.artists,
        name: item.name,
        id: item.id,
        type: item.type,
      };

      filterData.push(obj);
      length++;
    }

    console.log(filterData);
    dispatch(
      profileActions.setTracks({
        playlist: filterData,
        playlistTrim: filterDataTrim,
      })
    );
  };
};

export const profileFollowingActions = (playlist) => {
  return (dispatch) => {
    const filterData = [],
      filterDataTrim = [];
    let length = 0;

    for (const item of playlist.artists.items) {
      const obj = {
        id: item.id,
        name: item.name,
        type: item.type,
        image: item.images[0].url,
      };

      filterData.push(obj);
      if (length < 5) {
        length++;
        filterDataTrim.push(obj);
      }
    }

    dispatch(
      profileActions.setFollowing({
        playlist: filterData,
        playlistTrim: filterDataTrim,
      })
    );
  };
};
