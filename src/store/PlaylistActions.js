import { playlistActions } from "./playList-slice";

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

export const setPlaylistActions = (playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of playlist.tracks.items) {
      const duration = findDuration(item.track.duration_ms);
      const obj = {
        duration: duration,
        artists: item.track.artists,
        id: item.track.id,
        type: item.track.type,
        image: item.track.album.images[0]?.url,
        name: item.track.name,
        albumName: item.track.album.name,
        albumType: item.track.album.type,
        albumId: item.track.album.id,
        uri: item.track.uri,
      };

      if (item.track.album.name) {
        filterData.push(obj);
      }
    }

    dispatch(
      playlistActions.setPlaylist({
        total_tracks: playlist.tracks.total,
        items: filterData,
        description: playlist.description,
        id: playlist.id,
        image: playlist.images[0].url,
        name: playlist.name,
        owner: playlist.owner,
        type: playlist.type,
        uri: playlist.uri,
      })
    );
  };
};
