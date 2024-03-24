export const CurrentAction = (playlist) => {
  return (dispatch) => {
    const obj = {
      name: playlist.name,
      type: playlist.type,
      id: playlist.id,
      image: playlist.album.images[0].url,
    };
  };
};
