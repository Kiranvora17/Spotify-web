import { libraryActions } from "./library-slice";

export const libraryAction = (playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of playlist.artists.items) {
      const obj = {
        id: item.id,
        type: item.type,
        href: item.href,
        name: item.name,
        image: item.images ? item.images[0].url : null,
      };
      filterData.push(obj);
    }

    dispatch(libraryActions.setLibrary({ playlist: filterData }));
  };
};
