import { artistActions } from "./artist-slice";

const addComma = (num) => {
  const str = num.toString();
  const digit = str.length;

  const remainder = digit % 3;
  let ans = str.slice(0, remainder) + ",";

  for (let i = remainder; i < digit - 1; i = i + 3) {
    const sample = str.slice(i, i + 3);
    ans = ans + sample + ",";
  }

  let finalAns = ans.slice(0, ans.length - 1);

  if (finalAns[0] === ",") {
    return finalAns.slice(1);
  } else {
    return finalAns;
  }
};

export const artistAction = (data) => {
  const followers = addComma(data.followers.total);
  return (dispatch) => {
    const artist = {
      followers: followers,
      id: data.id,
      image: data.images[0].url,
      name: data.name,
      type: data.type,
    };
    dispatch(artistActions.setArtist({ items: artist }));
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

export const popularAction = (playlist) => {
  return (dispatch) => {
    const filterData = [];
    let length = 1;

    for (const item of playlist.tracks) {
      const duration = findDuration(item.duration_ms);
      const obj = {
        track_number: length < 10 ? "0" + length : length,
        albumName: item.album.name,
        albumType: item.album.type,
        albumId: item.album.id,
        artists: item.artists,
        duration: duration,
        id: item.id,
        name: item.name,
        type: item.type,
        image: item.album.images[0].url,
      };

      if (item.album.name) {
        length++;
        filterData.push(obj);
      }
    }

    dispatch(artistActions.setPopular({ playlist: filterData }));
  };
};

export const PopularReleaseAction = (playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of playlist.items) {
      const obj = {
        description: "album",
        id: item.id,
        image: item.images[0].url,
        name: item.name,
        type: item.type,
      };

      filterData.push(obj);
    }

    dispatch(artistActions.setPopularRelease({ playlist: filterData }));
  };
};

export const singleAction = (playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of playlist.items) {
      const obj = {
        description: "single",
        id: item.id,
        image: item.images[0].url,
        name: item.name,
        type: item.type,
      };

      filterData.push(obj);
    }

    dispatch(artistActions.setSingle({ playlist: filterData }));
  };
};

export const compilationAction = (playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of playlist.items) {
      const obj = {
        description: "compilation",
        id: item.id,
        image: item.images[0].url,
        name: item.name,
        type: item.type,
      };

      filterData.push(obj);
    }

    dispatch(artistActions.setCompilation({ playlist: filterData }));
  };
};

export const relatedAction = (playlist) => {
  return (dispatch) => {
    const filterData = [];
    let length = 0;

    for (const item of playlist.artists) {
      const obj = {
        description: "Artist",
        id: item.id,
        image: item.images[0]?.url,
        name: item.name,
        type: item.type,
      };

      if (length < 5) {
        length++;
        filterData.push(obj);
      }
    }

    dispatch(artistActions.setRelated({ playlist: filterData }));
  };
};

export const appearsOnAction = (playlist) => {
  return (dispatch) => {
    const filterData = [];

    for (const item of playlist.items) {
      const obj = {
        id: item.id,
        image: item.images[0].url,
        name: item.name,
        type: item.type,
      };

      filterData.push(obj);
    }

    dispatch(artistActions.setAppearsOn({ playlist: filterData }));
  };
};
