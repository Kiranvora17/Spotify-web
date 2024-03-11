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

export const trackActions = (playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of playlist.items) {
      const obj = {
        artists: playlist.album.artists,
        image: playlist.album.images[0].url,
        albumName: playlist.album.name,
        type: playlist.album.type,
        id: playlist.album.id,
        trackArtist: playlist.artists,
        duration: findDuration(playlist.duration_ms),
        name: playlist.name,
      };
    }
  };
};
