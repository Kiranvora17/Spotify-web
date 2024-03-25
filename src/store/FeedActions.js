import { feedActions } from "./feed-slice";

export const FeaturedActions = (playlists) => {
  return (dispatch) => {
    let filterData = [],
      filterDataTrim = [];
    let length = 0;
    if (playlists) {
      for (const data of playlists?.playlists.items) {
        const obj = {
          id: data.id,
          type: data.type,
          description: data.description,
          image: data.images[0].url,
          name: data.name,
          uri: data.uri,
        };
        if (length < 5) {
          filterDataTrim.push(obj);
        }
        filterData.push(obj);
        length++;
      }

      dispatch(
        feedActions.setFeaturedPlayList({
          playlist: filterData,
          playlistTrim: filterDataTrim,
        })
      );
    }
  };
};

export const newReleasesActions = (playlist) => {
  return (dispatch) => {
    let filterData = [],
      filterDataTrim = [];
    let length = 0;

    if (playlist) {
      for (const item of playlist?.albums.items) {
        const obj = {
          id: item.id,
          type: item.type,
          href: item.href,
          image: item.images[0].url,
          name: item.name,
          artists: item.artists,
          uri: item.uri,
        };

        if (length < 5) {
          filterDataTrim.push(obj);
        }
        filterData.push(obj);
        length++;
      }

      dispatch(
        feedActions.setNewReleases({
          playlist: filterData,
          playlistTrim: filterDataTrim,
        })
      );
    }
  };
};

export const recentlyActions = (playlist) => {
  return (dispatch) => {
    let data = [];
    let filterData = [],
      filterDataTrim = [];
    let length = 0;

    if (playlist) {
      for (const item of playlist?.items) {
        const obj = {
          id: item.track.album.id,
          type: item.track.album.type,
          name: item.track.album.name,
          artists: item.track.album.artists,
          href: item.track.album.href,
          image: item.track.album.images[0].url,
          totalTracks: item.track.album.total_tracks,
          uri: item.track.album.uri,
        };
        data.push(obj);
      }

      const jsonObject = data.map(JSON.stringify);
      const uniqueSet = new Set(jsonObject);
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

      for (const item of uniqueArray) {
        filterData.push(item);
        if (length < 5) {
          filterDataTrim.push(item);
        }
        length++;
      }

      dispatch(
        feedActions.setRecentlyplayed({
          playlist: filterData,
          playlistTrim: filterDataTrim,
        })
      );
    }
  };
};

export const topHitsAction = (playlist) => {
  return (dispatch) => {
    let filterData = [],
      filterDataTrim = [];
    let length = 0;

    if (playlist) {
      for (const item of playlist?.albums.items) {
        const obj = {
          type: item.type,
          id: item.id,
          artists: item.artists,
          href: item.href,
          image: item.images[0].url,
          name: item.name,
          uri: item.uri,
        };

        filterData.push(obj);
        if (length < 5) {
          filterDataTrim.push(obj);
          length++;
        }
      }

      dispatch(
        feedActions.setTopHits({
          playlist: filterData,
          playlistTrim: filterDataTrim,
        })
      );
    }
  };
};

export const ViralIndiaActions = (playlist) => {
  return (dispatch) => {
    let filterData = [],
      filterDataTrim = [];
    let length = 0;

    if (playlist) {
      for (const item of playlist?.playlists.items) {
        const obj = {
          type: item.type,
          id: item.id,
          description: item.description,
          href: item.href,
          image: item.images[0].url,
          name: item.name,
          trackHref: item.tracks.href,
          uri: item.uri,
        };

        if (length < 5) {
          filterDataTrim.push(obj);
          length++;
        }
        filterData.push(obj);
      }

      dispatch(
        feedActions.setViralIndia({
          playlist: filterData,
          playlistTrim: filterDataTrim,
        })
      );
    }
  };
};

export const TopArtistsActions = (playlist) => {
  return (dispatch) => {
    let filterData = [],
      filterDataTrim = [];
    let length = 0;

    if (playlist) {
      for (const item of playlist?.items) {
        const obj = {
          type: item.type,
          id: item.id,
          href: item.href,
          image: item.images[0].url,
          name: item.name,
          uri: item.uri,
        };

        filterData.push(obj);
        if (length < 5) {
          filterDataTrim.push(obj);
          length++;
        }
      }

      dispatch(
        feedActions.setTopArtists({
          playlist: filterData,
          playlistTrim: filterDataTrim,
        })
      );
    }
  };
};
