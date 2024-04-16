import { likeActions } from "./like-slice";
import spotify from "../images/default-profile.png";

export const findDuration = (duration) => {
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

    if (playlist) {
      for (const item of playlist?.items) {
        if (item.track.name) {
          const obj = {
            artists: item.track?.artists,
            duration: findDuration(item.track?.duration_ms),
            id: item.track?.id,
            name: item.track?.name,
            type: item.track?.type,
            albumId: item.track?.album.id,
            albumType: item.track?.album.type,
            albumName: item.track?.album?.name,
            image: item.track.album?.images
              ? item.track.album?.images[0]?.url
              : null,
            uri: item.track?.uri,
          };
          filterData.push(obj);
        }
      }
      dispatch(likeActions.setTracks({ playlist: filterData }));
    }
  };
};

export const trackIdsActions = (playlist) => {
  return (dispatch) => {
    const ids = [];

    if (playlist) {
      for (const item of playlist?.items) {
        ids.push(item.track.id);
      }

      dispatch(likeActions.setTracksIds({ ids: ids }));
      dispatch(likeActions.setIds({ ids: ids }));
    }
  };
};

export const likeAlbumActions = (playlist) => {
  return (dispatch) => {
    const filterData = [],
      filterDataTrim = [];
    let length = 0;

    if (playlist) {
      for (const item of playlist?.items) {
        const obj = {
          id: item.album?.id,
          image: item.album?.images ? item.album?.images[0]?.url : null,
          type: item.album?.type,
          name: item.album?.name,
          uri: item.album?.uri,
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
    }
  };
};

export const albumIdsActions = (playlist) => {
  return (dispatch) => {
    const ids = [];

    if (playlist) {
      for (const item of playlist?.items) {
        ids.push(item.album.id);
      }

      dispatch(likeActions.setIds({ ids: ids }));
    }
  };
};

export const likePlaylistActions = (playlist) => {
  return (dispatch) => {
    const filterData = [],
      filterDataTrim = [];
    let length = 0;

    if (playlist) {
      console.log(playlist);
      for (const item of playlist?.items) {
        const obj = {
          description: item?.description,
          id: item?.id,
          image: item.images ? item.images[0]?.url : null,
          name: item?.name,
          type: item?.type,
          uri: item?.uri,
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
    }
  };
};

export const playlistIdsActions = (playlist) => {
  return (dispatch) => {
    const ids = [];

    if (playlist) {
      for (const item of playlist?.items) {
        ids.push(item.id);
      }

      dispatch(likeActions.setIds({ ids: ids }));
    }
  };
};

export const ArtistIdsActions = (playlist) => {
  return (dispatch) => {
    const ids = [];

    if (playlist) {
      for (const item of playlist?.artists.items) {
        ids.push(item.id);
      }
      dispatch(likeActions.setIds({ ids: ids }));
    }
  };
};
